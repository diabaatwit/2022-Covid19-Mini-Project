import { set } from 'mongoose';
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import '../css/table.css'
import EditableRow from './EditableRow';
import { ExamForm } from './ExamForm';
import ReadOnlyRow from './ReadOnlyRow';
import SearchBar from './SearchBar';
import { TableCount } from './TableCount';
import { TableRender } from './TableRender';
import '../css/site.css'
import { AdminControls } from './AdminControls';


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
      exams: [],
      filteredExams: [],
      isLoading: false,
      isError: false,
      searchTerm: '',
      recordId: '',
      editRecordData: {},
      record: {
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
      isNewExamVisable: false,
      isEditing: false,
      editingStatus: 'Edit List'
    }
    
  }

  setSearchTerm = (term) =>{
    this.setState({searchTerm: term})

    const newExams = this.state.exams.filter((val)=>{
      if(this.state.searchTerm=="") {
        return val
      }else if ((val._id).includes(this.state.searchTerm) ||
       (val.patientID).includes(this.state.searchTerm) ||
       (val.keyFindings.toLowerCase()).includes(this.state.searchTerm.toLowerCase())){
        return val
      }
    })

    this.setState({
      filteredExams: newExams
    })
    
  }

/* responsible for toggling the stlye on an exam card */

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
  }

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
      //console.log(recordValues)
      this.setState({
        editRecordData: recordValues
      })
      
  }
  cancelEdit(){
    this.setState({recordId: ''})
  }
  cancelExam(){
    this.setState({isNewExamVisable: false})
  }
  createExam(){
    this.setState({isNewExamVisable: true})
  }
  toggleEdit(){
    this.setState({isEditing: !this.state.isEditing})
    this.setState({editingStatus: (!this.state.isEditing)? 'Cancel' : 'Edit List' }) ;
  }


/* fetching exams */
  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:3001/exams');
    if (response.ok) {
      const exams = await response.json()
      console.log(exams)
      console.log(typeof(exams))
      this.setState({ exams, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
      //console.log(error)

    }
  }



/**Rendering an exam card */
  examsRender = () => {
        const examToUse = (!this.state.searchTerm)? this.state.exams: this.state.filteredExams;
        return( 
          // <Fragment>
          //   { this.state.recordId === exam._id? (
          //   <EditableRow editRecordData={this.editRecordData} handleEditFormChange={this.handleEditFormChange} />
          //   ) : (

            <TableRender 
            EXAMS={examToUse} 
            handleEditClick={this.handleEditClick}
            handleEditFormChange ={this.handleEditFormChange}
            recordId={this.state.recordId} 
            editRecordData={this.state.editRecordData}
            cancelEdit={this.cancelEdit}
            isEditing={this.state.isEditing}
            />
            
          //   )}
          // </Fragment>
          
        )
  }

  render() {
    const { exams, isLoading, isError } = this.state
    //const [searchTerm, setSearchTerm] = useState('')

    if (isLoading) {
      return <div class="loading">Loading Table...</div>
    }

    if (isError) {
      return <div>Error</div>

    }

    return exams.length > 0
      ? (
        //input tracking searchTerms
        <div class="container">
          <div>
            
          <TableCount exams={this.state.exams} filteredExams={this.state.filteredExams}/>

          </div>
          <div id="search-nav">
              <SearchBar setSearchTerm = {this.setSearchTerm}/>
              <AdminControls
                editingStatus = {this.state.editingStatus}
                toggleEdit = {this.toggleEdit}
                createExam = {this.createExam}
                isEditing = {this.state.isEditing}
                isNewExamVisable = {this.state.isNewExamVisable}
              />
          </div>
          
          {this.state.isNewExamVisable && 
            <ExamForm 
              handleAddFormChange = {this.handleAddFormChange}
              handleAddFormSubmit = {this.handleAddFormSubmit}
              cancelExam = {this.cancelExam}/>
          }
        <div>
        
        </div>

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
