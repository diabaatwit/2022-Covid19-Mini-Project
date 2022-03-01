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
    this.handleEditFormChange = this.handleEditClick.bind(this);
    this.cancelExam = this.cancelExam.bind(this);
    this.handleAddFormChange = this.handleAddFormChange.bind(this);
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.createExam = this.createExam.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.setSearchTerm.bind(this);

    this.state = {
      exams: [], //stores all the exams
      filteredExams: [], //filtered exams from <SearchBar>
      isLoading: false, //boolean to render loading before the table finishes loading
      isError: false, //boolean keeps track if there was an error loading the exams
      searchTerm: '', //the value typed in <SearchBar>
      recordId: '', //the examID of an element, stored after a row's edit button has been clicked
      editRecordData: {}, //the edited copy of an editable row
      record: { //record to be sent via <ExamForm>
        patientID: '',
        _id: '',
        xRayImageLink: '',
        keyFindings: '',
        brixiaScores: '',
        age: '',
        sex: '',
        bmi: '',
        zipCode: '',
      },
      isNewExamVisable: false, //checks to see if a <ExamForm> is present
      isEditing: false, //checks to see if the edit list button has been pressed
      editingStatus: 'Edit List' //The edit button's text value from <ExamForm>
    }

  }

  /**
   * @param {String} term what's currently typed into the <SearchBar>
   * Responsible for filtering the exam list based on what's typed into the searchbar
   */
  setSearchTerm = (term) =>{
    this.setState({searchTerm: term})

    const newExams = this.state.exams.filter((val)=>{
      if(!this.state.searchTerm) { //if there is nothing to be search
        return val
      }else if((val._id).includes(this.state.searchTerm) || //search bar filters for ExamId, PatientId, and KeyFindings
              (val.patientID).includes(this.state.searchTerm) ||
              (val.keyFindings.toLowerCase()).includes(this.state.searchTerm.toLowerCase())){
                return val
      }
    })

    this.setState({
      filteredExams: newExams //sets filtered exams 
    })

  }

  /**
   * 
   * @param {Object} event passes an event object  from an onChange
   * Called when an onChange event happens in a <ExamForm> form 
   */
  handleAddFormChange(event){
    event.preventDefault();

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value;

    const newFormData = {...this.state.record};
    newFormData[fieldName] = fieldValue;

    this.setState({
      record: newFormData
    });
  }

  /**
   * 
   * @param {Object} event passes an event object from a Submit
   * Responsible for submitting the form to the database for new exams from <ExamForm>
   */
  handleAddFormSubmit(event){
    event.preventDefault();

    const newRecord = {
      patientID: this.state.record.patientID,
      _id: this.state.record._id,
      xRayImageLink: this.state.record.xRayImageLink,
      keyFindings: this.state.record.keyFindings,
      brixiaScores: this.state.record.brixiaScores,
      age: this.state.record.age,
      sex: this.state.record.sex,
      bmi: this.state.record.bmi,
      zipCode: this.state.record.zipCode
    }
    this.cancelExam();
    console.log(newRecord)

    //This is what we need to send to the server
    //code goes here
  }

  /**
   * 
   * @param {Object} event object from TableRender Inline edits
   * responsible for keeping track of the information changed during inline edits
   */
  handleEditFormChange(event){
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...this.state.editRecordData};
    newFormData[fieldName] = fieldValue;
    this.setState({
      editRecordData: newFormData
    })
  }

  /**
   * 
   * @param {Object} event an event from an onClick
   * @param {Object} exam the exam from this row
   * @param {String} key the key is the examID for an exam wished to be edited
   */
  handleEditClick(event, exam, key){
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
      bmi: exam.bmi,
      zipCode: exam.zipCode
    }

    this.setState({
      editRecordData: recordValues
    })
  }
  /**
   * stops inline edits by resetting the recordId needed to render an editable row
   * in <TableRender>
   */
  cancelEdit(){
    this.setState({recordId: ''})
  }
  /**
   * cancels a new exam form
   */
  cancelExam(){
    this.setState({isNewExamVisable: false})
  }
  /**
   * allows for an exam form to render
   */
  createExam(){
    this.setState({isNewExamVisable: true})
  }
  /**
   * Switches the state and wording of the edit button from <AdminControls>
   */
  toggleEdit(){
    this.setState({isEditing: !this.state.isEditing})
    this.setState({editingStatus: (!this.state.isEditing)? 'Cancel' : 'Edit List' }) ;
  }

  /**
   * fetches exams from the server
   */
  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:3001/exams'); //path
    if (response.ok) {
      const exams = await response.json() //
      // console.log(exams)
      // console.log(typeof(exams))
      this.setState({ exams, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  /**
   * sets up the table
   * @returns The table view
   */
  examsRender = () => {
    //if there are no filtered exams, use exams
    const examToUse = (!this.state.searchTerm)? this.state.exams: this.state.filteredExams; 
    return( 
      <TableRender 
        EXAMS={examToUse} 
        handleEditClick={this.handleEditClick}
        handleEditFormChange ={this.handleEditFormChange}
        recordId={this.state.recordId} 
        editRecordData={this.state.editRecordData}
        cancelEdit={this.cancelEdit}
        isEditing={this.state.isEditing}
      />

    )
  }
  /**
   * brings all the components togethre to create the table view and tools
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
      <div class="container">

        <div>       
          <TableCount exams={this.state.exams} filteredExams={this.state.filteredExams}/>
        </div>

        <div id="search-nav">
          <SearchBar setSearchTerm = {this.setSearchTerm}/>
          <AdminControls //the create exam and edit list buttons
            editingStatus = {this.state.editingStatus}
            toggleEdit = {this.toggleEdit}
            createExam = {this.createExam}
            isEditing = {this.state.isEditing}
            isNewExamVisable = {this.state.isNewExamVisable}
          />
        </div>
        
        {this.state.isNewExamVisable && //render the form if the create exam button was pressed
          <ExamForm 
            handleAddFormChange = {this.handleAddFormChange}
            handleAddFormSubmit = {this.handleAddFormSubmit}
            cancelExam = {this.cancelExam}
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
