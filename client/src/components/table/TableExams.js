import { set } from 'mongoose';
import React, { Component } from 'react'
import '../css/table.css'
import EditableRow from './EditableRow'; //Previous attemp that used a vanilla table to edit inline
import { ExamForm } from './ExamForm';
import ReadOnlyRow from './ReadOnlyRow';  //Previous attemp that used a vanilla table to read rows
import SearchBar from './SearchBar';  //Filters the exams
import { TableCount } from './TableCount';  //Displays count
import { TableRender } from './TableRender'; //Renders the actual table
import '../css/site.css'
import { AdminControls } from './AdminControls'; //Edit List and Creat Exam Button

/**
 * This component is responsible for putting the whole table view and table tools together
 */
class Table extends Component {
  constructor(props) {
    super(props);
    //there should be some way to iterate over this
    this.presentExams = React.createRef();
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditFormChange = this.handleEditFormChange.bind(this);
    this.cancelExam = this.cancelExam.bind(this);
    this.handleAddFormChange = this.handleAddFormChange.bind(this);
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.createExam = this.createExam.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteExam = this.deleteExam.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.setSearchTerm.bind(this);

    this.state = {
      exams: [], //stores all the exams
      patients: [], //stores all patients
      filteredExams: [], //filtered exams from <SearchBar>
      isLoading: false, //boolean to render loading before the table finishes loading
      isError: false, //boolean keeps track if there was an error loading the exams
      searchTerm: '', //the value typed in <SearchBar>
      recordId: '', //the examID of an element, stored after a row's edit button has been clicked
      editRecordData: {}, //the edited copy of an editable row
      record: { //record to be sent via <ExamForm>
        patientID: '',

        date: '',
        xRayImageLink: '',
        keyFindings: '',
        brixiaScores: '',

      },
      isNewExamVisable: false, //checks to see if a <ExamForm> is present
      isEditing: false, //checks to see if the edit list button has been pressed
      editingStatus: 'Edit List', //The edit button's text value from <ExamForm>

    }

  }

  /**
   * Responsible for filtering the exam list based on what's typed into the searchbar
   * @param {String} term what's currently typed into the <SearchBar>
   */
  setSearchTerm = (term) => {
    this.setState({ searchTerm: term })

    const newExams = this.state.exams.filter((val) => {
      if (!this.state.searchTerm) { //if there is nothing to be search
        return val
      } else if ((val._id).includes(this.state.searchTerm) || //search bar filters for ExamId, PatientId, and KeyFindings
        (val.patientID).includes(this.state.searchTerm) ||
        (val.keyFindings.toLowerCase()).includes(this.state.searchTerm.toLowerCase())) {
        return val
      }
    })

    this.setState({
      filteredExams: newExams //sets filtered exams 
    })

  }

  /**
   * Called when an onChange event happens in a <ExamForm> form
   * @param {Object} event passes an event object  from an onChange 
   */
  handleAddFormChange(event, date) {
    let fieldName;
    let fieldValue;

    console.log(event);
    console.log("my new date: " + date);
    
    if (date !== undefined) {
      fieldName = 'date';
      fieldValue = date;
    } else if (date === undefined){
      event.preventDefault();
      fieldName = event.target.getAttribute('name')
      fieldValue = event.target.value;
    }
    const newFormData = { ...this.state.record };
    newFormData[fieldName] = fieldValue;
    this.setState({
      record: newFormData
    });
  }

  /**
   * Responsible for submitting the form to the database for new exams from <ExamForm>
   * @param {Object} event passes an event object from a Submit
   * @param {Boolean} isNewForm true is <ExamForm> false means that an exam was edited
   */
  async handleAddFormSubmit(event, isNewForm) { //newForm refering to <ExamForm> so 
    event.preventDefault();
    console.log(event)
    const formType = (isNewForm) ? this.state.record : this.state.editRecordData;


    const newExamRecord = {
      patientID: formType.patientID,
      date: formType.date,
      xRayImageLink: formType.xRayImageLink,
      keyFindings: formType.keyFindings,
      brixiaScores: formType.brixiaScores,
    }

    const editExamRecord = {
      patientID: formType.patientID,

      _id: formType._id,
      xRayImageLink: formType.xRayImageLink,
      keyFindings: formType.keyFindings,
      brixiaScores: formType.brixiaScores,
    }


    const editPatientRecord = {

      age: formType.age,
      sex: formType.sex,
      BMI: formType.BMI,
      zipCode: formType.zipCode
    }




    //This is what we need to send to the server
    //code goes here <---------------------------------
    //Add PATCH and POST
    const serverMethod = (isNewForm) ? "POST" : "PATCH"; //if its a new form, we must POST it, otherwise PATCH (edit) it


    const newExamOptions = {


      method: serverMethod,
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExamRecord)

    }


    const editExamOptions = {

      method: serverMethod,
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editExamRecord)

    }

    const editPatientOptions = {
      method: serverMethod,
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editPatientRecord)
    }

    if (isNewForm) { //POST
      await fetch("http://localhost:3001/exams", newExamOptions)

        .then(response => response.text())
        .catch(error => console.log('error', error));
    }

    else { //PATCH

      console.log(editExamRecord.patientID)

      /*await fetch(`http://localhost:3001/patients/${newExamRecord.patientID}`, patientOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));
      await fetch(`http://localhost:3001/exams/${newExamRecord._id}`, options)
        .then(response => response.text())
        .catch(error => console.log('error', error));*/

      
        Promise.all(

          fetch(`http://localhost:3001/exams/${editExamRecord._id}`, editExamOptions),
          fetch(`http://localhost:3001/patients/${editExamRecord.patientID}`, editPatientOptions)


        ).catch((err) => {
          console.log('error', err)
        })
    }

    this.cancelExam();
    this.refreshPage();
  }

  /**
   * Responsible for keeping track of the information changed during inline edits
   * @param {Object} event object from TableRender Inline edits
   */
  handleEditFormChange(event) {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...this.state.editRecordData };
    newFormData[fieldName] = fieldValue;
    this.setState({
      editRecordData: newFormData
    })
  }

  /**
   * Triggered when a row's edit button is clicked on
   * @param {Object} event an event from an onClick
   * @param {Object} exam the exam from this row
   * @param {String} key the key is the examID for an exam wished to be edited
   */
  handleEditClick(event, exam, key) {
    event.preventDefault();
    const newRecordId = key;
    this.setState({
      recordId: newRecordId
    });

    const recordValues = {
      patientID: exam.patientID,
      _id: exam._id,
      xRayImageLink: exam.xRayImageLink,
      keyFindings: exam.keyFindings,
      brixiaScores: exam.brixiaScores,
      age: exam.age,
      sex: exam.sex,
      BMI: exam.BMI,
      zipCode: exam.zipCode
    }
    console.log('test test test test')
    console.log(exam.age)
    this.setState({
      editRecordData: recordValues
    })
  }
  /**
   * deletes an exam entry from the database
   * @param {Object} exam exam entry to delete
   */
  async deleteExam(event, exam) {
    event.preventDefault()

    /*this.setState({notify: {
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'success'
    }})*/
    if (window.confirm("Are you sure you want to delete this exam?")) {
      console.log(exam)

      const options = {
        method: "DELETE",
      }

      await fetch(`http://localhost:3001/exams/${exam._id}`, options)
        .then(response => response.text())
        .catch(error => console.log('error', error));

        this.refreshPage();
    }
    

  }

  /**
   * Stops inline edits by resetting the recordId needed to render an editable row
   * in <TableRender>
   */
  cancelEdit() {
    this.setState({ recordId: '' })
  }
  /**
   * Cancels a new exam form
   */
  cancelExam() {
    this.setState({ isNewExamVisable: false })
  }
  /**
   * Allows for an exam form to render
   */
  createExam() {
    this.setState({ isNewExamVisable: true })
  }
  /**
   * Switches the state and wording of the edit button from <AdminControls>
   */
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing })
    this.setState({ editingStatus: (!this.state.isEditing) ? 'Cancel' : 'Edit List' });
  }

  /**
  * Refreshes the page
  */
  refreshPage() {
    window.location.reload(false);
  }

  /**
   * Fetches exams from the server
   */
  async componentDidMount() {

    let newExams = []
    let newPatients = []
    let patients = []
    let examObjects = []


    try {




      this.setState({ isLoading: true })
      const response = await fetch('http://localhost:3001/exams'); //path
      if (response.ok) {
        newExams = await response.json()
        if (window.location.pathname.split("/")[1] === 'patient') {
          newExams = newExams.filter((exam) => {
            return window.location.pathname.split("/")[2] === exam.patientID
          })
        }


        // console.log(exams)
        // console.log(typeof(exams))
        //this.setState({ exams: newExams })
        this.setState({ isLoading: false })
      } else {
        this.setState({ isError: true, isLoading: false })
      }


      // fetching all exams' patients
      for (let i = 0; i < newExams.length; i++) {
        //console.log(this.state.exams[i].patientID)
        const responsePatient = await fetch('http://localhost:3001/patients/' + newExams[i].patientID);
        if (responsePatient.ok) {
          newPatients[i] = await responsePatient.json()

        } else {
          this.setState({ isErrorPatient: true, isLoadingPatient: false })
          //console.log(error)
        }
      }






      // converting array of arrays to array of objects, to be able to combine it with exams
      for (let i = 0; i < newPatients.length; i++) {
        var arr = newPatients[i]
        var object = arr[0]
        console.log(object)
        patients[i] = object
      }

      console.log('patients')
      console.log(patients)

      // combining exams and patients records in one array of objects
      for (let i = 0; i < newExams.length; i++) {
        var examObject = {
          _id: newExams[i]._id,
          patientID: newExams[i].patientID,
          xRayImageLink: newExams[i].xRayImageLink,
          keyFindings: newExams[i].keyFindings,
          brixiaScores: newExams[i].brixiaScores,
          age: patients[i].age,
          sex: patients[i].sex,
          BMI: patients[i].BMI,
          zipCode: patients[i].zipCode

        }
        /*examObject._id = newExams[i]._id
        examObject.patientID = newExams[i].patientID
        examObject.xRayImageLink = newExams[i].xRayImageLink
        examObject.keyFindings = newExams[i].keyFindings
        examObject.brixiaScores = newExams[i].brixiaScores
        examObject.age = patients[i].age
        examObject.sex = patients[i].sex
        examObject.BMI = patients[i].BMI
        examObject.zipCode = patients[i].zipCode*/

        console.log('each object')
        console.log(examObject)

        /*examObjects[i] = examObject
        console.log('test object')
        console.log(examObjects[i])
        if(i > 0){
          examObjects[i-1] = 
        }*/
        examObjects.push(examObject)
        console.log(examObjects)

      }
      console.log('test')
      console.log(examObjects)

      this.setState({ exams: examObjects })


      console.log('final')
      console.log('------------------------------')
      console.log(this.state.exams)

    } catch (error) {
      console.error(error);
    }


  }

  /**
   * Sets up the table
   * @returns The table view
   */
  examsRender = () => {
    //if there are no filtered exams, use exams
    const examToUse = (!this.state.searchTerm) ? this.state.exams : this.state.filteredExams;
    return (
      <TableRender
        EXAMS={examToUse}
        handleEditClick={this.handleEditClick}
        handleEditFormChange={this.handleEditFormChange}
        handleAddFormSubmit={this.handleAddFormSubmit}
        recordId={this.state.recordId}
        editRecordData={this.state.editRecordData}
        cancelEdit={this.cancelEdit}
        isEditing={this.state.isEditing}
        deleteExam={this.deleteExam}
      />

    )
  }
  /**
   * Brings all the components togethre to create the table view and tools
   * @returns All the rendered elements for a table component
   */
  render() {
    const { exams, isLoading, isError } = this.state

    if (isLoading) {
      return <div class="loading">Loading Table...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return exams.length > 0
      ? (
        //Table Render after succesfully loading exams
        //<Notification notify = {this.state.notify}/>
        <div class="patient-table-container">


          <div>

            <TableCount examCount={(!this.state.searchTerm) ? this.state.exams : this.state.filteredExams} />
          </div>

          <div id="search-nav">
            <SearchBar setSearchTerm={this.setSearchTerm} />
            {window.location.pathname.split("/")[1] === 'admin' &&

              <AdminControls //the create exam and edit list buttons
                editingStatus={this.state.editingStatus}
                toggleEdit={this.toggleEdit}
                createExam={this.createExam}
                isEditing={this.state.isEditing}
                isNewExamVisable={this.state.isNewExamVisable}
              />}
          </div>

          {this.state.isNewExamVisable && //render the form if the create exam button was pressed
            <ExamForm
              handleAddFormChange={this.handleAddFormChange}
              handleAddFormSubmit={this.handleAddFormSubmit}
              cancelExam={this.cancelExam}
            />
          }

          <div className="app-container">
            {this.examsRender()}
          </div>

        </div>
      ) : (
        <div>No exams.</div>
      )
  }

}

export default Table;
