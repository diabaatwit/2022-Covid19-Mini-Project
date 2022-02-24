import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import './css/table.css'
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';

class Table extends Component {
  constructor(props) {
    super(props);
    this.presentExams = React.createRef();
    this.handleEditClick = this.handleEditClick.bind(this);
    this.state = {
      exams: [],
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
      }
    }
    
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

  handleAddFormSubmit(event){
    event.preventDefault();

    const newRecord = {
        _id: this.state.record._id,
        xRayImageLink: this.state.record.xRayImageLink,
        keyFindings: this.state.record.keyFindings,
        brixiaScores: this.state.record.brixiaScores,
        age: this.state.record.age,
        sex: this.state.record.sex,
        bmi: this.state.record.bmi,
        zipCode: this.state.record.zipCode
    }

    //This is what we need to send to the server
  }

  handleEditClick(event,exam){
    event.preventDefault();
    const newRecordId = exam._id;
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


  onClick() {
    this.setState({
      isSelected: !this.state.isSelected
    });

  }

  onClickPatientID(idClicked){
    var patientURL = "/patient/" + idClicked
    console.log(patientURL)
    window.patientID = patientURL
    return patientURL
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
  examRecordCard = () => {
  //filtering the exam list by what was entered in the search box, which is stored under state searchTerm
    let examCount = 0;
    return this.state.exams.filter((val)=>{
      if(this.state.searchTerm=="") {
        return val
      }else if ((val._id).includes(this.state.searchTerm) ||
       (val.patientID).includes(this.state.searchTerm) ||
       (val.keyFindings.toLowerCase()).includes(this.state.searchTerm.toLowerCase())){
        return val
      }
    }).map(exam => {

        return( 
          <Fragment>
            { this.state.recordId === exam._id? (
            <EditableRow editRecordData={this.editRecordData} handleEditFormChange={this.handleEditFormChange} />
            ) : (
            <ReadOnlyRow exam={exam} 
            handleEditClick={this.handleEditClick}/>
            )}
            
            
          </Fragment>
          
        )

    })
  }

  /**
   * <div className ="exam-card" key={exam._id}>

          <div className="card-item xray-box">
            <img className="xray" src={exam.xRayImageLink} alt="xRayImage"/>
          </div>
          <div className="spacer"/>
          <div className="card-item brixia-scores"><span>{exam.brixiaScores}</span></div>
          <div className="spacer"/>
          <div className="card-item exam-id"><Link to={{pathname: '/exam/' + exam._id}}><span>{exam._id}</span></Link></div>
          <div className="spacer"/>
          <div className="card-item patient-id"><Link to={{pathname: '/patient/' + exam.patientID}} ><span>{exam.patientID}</span></Link></div>
          <div className="spacer"/>
          <div className="card-item key-findings"><span>{exam.keyFindings}</span></div>
        </div>
  */
/**
 *
 *  <div className = "header-exam">
           <div id="img-header">IMG</div>
           <div id="brixia-header">Brixia<br/> Scores</div>
           <div id="exam-header"> Exam ID</div>
           <div id="patient-header"> Patient ID</div>
           <div id="key-header"> Key Findings</div>
          </div>
 */
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
            <h1>Exam List</h1>
            <h3>{this.presentExams.current}</h3>
          </div>
          <div id="search-nav">
            <div id="search-container">
              <p id="search-label">Search:</p>
              <input className="search-bar" type="text"
              value={this.state.searchTerm}
              onChange={event => {
                this.setState({ searchTerm: event.target.value} )} }/>
            </div>
            
              <div id="edit-buttons">
                <button id='edit-list'>Edit List</button>
                <button id='create-exam'>Create Exam</button>
              </div>
            
          </div>

        <div>

        </div>

          <div className="app-container">
            <div className="create-exam">
              <h2>New Exam:</h2>
              
              <form onSubmit={this.handleAddFormSubmit}>
                <input
                type="text"
                name="patientID"
                required="required"
                placeholder="Patient ID"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="_id"
                required="required"
                placeholder="Exam ID"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="xRayImageLink"
                required="required"
                placeholder="X-ray URL"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="keyFindings"
                required="required"
                placeholder="Key Findings"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="brixiaScores"
                required="required"
                placeholder="Brixia Scores"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="age"
                required="required"
                placeholder="Age"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="sex"
                required="required"
                placeholder="Sex"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="bmi"
                required="required"
                placeholder="BMI"
                onChange={this.handleAddFormChange}
                  />
                  <input
                type="text"
                name="zipCode"
                required="required"
                placeholder="Zipcode"
                onChange={this.handleAddFormChange}
                  />
                  <button type="submit">Add</button>


              </form>
            </div>

            <form>
              <table ref={ this.presentExams}>
                <thead>
                  <tr>
                    <th>Patient name</th>
                    <th>Exam ID</th>
                    <th colSpan={2}>Key Findings</th>
                    <th> Brixia Score</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>BMI</th>
                    <th>Zipcode</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody >
                    {this.examRecordCard()}
                  </tbody>
              </table>
            </form>
          </div>




        </div>
      ) : (
        <div>No exams.</div>
      )
  }

}

export default Table;

// onClick={this.onClickPatientID(exam.patientID)} href="/patient"