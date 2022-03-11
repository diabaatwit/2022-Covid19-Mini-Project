import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './css/examPage.css'
import _ from "lodash";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ExamInfoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      patients: [],
      isLoading: false,
      isError: false,
      isLoadingPatient: false,
      isErrorPatient: false,
      age: "",
      sex: "",
      zipCode: "",
      BMI: ""
    }
  }
  fetchData = async () => {
    try {
      this.setState({ isLoading: true })
      var url = window.location.pathname
      console.log(url)
      var id = url.split("/")
      console.log(id[2])
      const response = await fetch('http://localhost:3001/exams/' + id[2]);
      if (response.ok) {
        const exams = await response.json()
        console.log(exams)
        console.log(typeof (exams))
        this.setState({ exams, isLoading: false })
      } else {
        this.setState({ isError: true, isLoading: false })
        //console.log(error)
      }

      const responsePatient = await fetch('http://localhost:3001/patients/' + this.state.exams[0].patientID);
      if (response.ok) {
        const patients = await responsePatient.json()
        this.setState({ patients, isLoadingPatient: false })
        const age = this.state.patients[0].age
        const sex = this.state.patients[0].sex
        const zipCode = this.state.patients[0].zipCode
        const BMI = this.state.patients[0].BMI
        this.setState({ age, sex, zipCode, BMI })

      } else {
        this.setState({ isErrorPatient: true, isLoadingPatient: false })
        //console.log(error)
      }
    } catch (error) {
      console.error(error);
    }

  }

  refreshPage() {
    window.location.assign("/");
  }

  async deleteExam(event, id) {
    event.preventDefault()
    if (window.confirm("Are you sure you want to delete this exam?")) {
      console.log(id)
      const options = {
        method: "DELETE",
      }
      await fetch(`http://localhost:3001/exams/${id}`, options)
        .then(response => response.text())
        .catch(error => console.log('error', error));
        this.refreshPage();
    }
  }

  async cancelEditing(event,id) {
    event.preventDefault()
    window.location.assign(`/exam/${id}`);
  }



  /* fetching exam */
  async componentDidMount() {
    this.fetchData();
  }
  render() {
    const { exams, isLoading, isError } = this.state
    console.log(exams.length)
    //const [searchTerm, setSearchTerm] = useState('')
    if (isLoading) {
      return <div className="loading">Loading Exam...</div>
    }
    if (isError) {
      return <div>Error</div>
    }
    return exams.length > 0 ? (
      <div id="exampage-container" >
        <div id="returnhome-link">
          <Link to="/"><FiArrowLeft/> Back to Exam List</Link>
        </div>
        <div id="exampage-titlecontainer">
          <div id='editexam-title'>Exam Details</div>
          <div id='editexam-buttons'>
          <a href={'/exam/'+this.state.exams[0]._id+'/edit'}>
                <button 
                  id='delBtn'
                  onClick={(event)=>{this.deleteExam(event,this.state.exams[0]._id)}}>
                  Delete
                </button>
              </a>
            <a href={'/exam/'+this.state.exams[0]._id+'/edit'}>
              <button 
                id='cancelBtn'
                onClick={(event)=>{this.cancelEditing(event,this.state.exams[0]._id)}}>
                Cancel
              </button>
            </a>
            <a href={'/exam/'+this.state.exams[0]._id+'/edit'}>
              <button id='saveBtn'>Save</button>
            </a>
          </div>
        </div>
        <div id="cards-container">
          {/* Patient Card */}
          <div className="card-container">
            <div className="card-title-container">
              <div className="icon-image">
                <img className="icon" src={require('../images/patient-icon.png')} alt="Patient Icon" />
              </div>
              <div>
                <p>Patient</p>
              </div>
            </div>
            {/* Patient Card */}
            <div className="card-data-container">
              <div className='row'>
                <div className='column'>
                  <div className='title-column'>
                    Patient ID
                  </div>
                  <div className='title-column'>
                    Age
                  </div>
                  <div className='title-column'>
                    Sex
                  </div>
                  <div className='title-column'>
                    BMI
                  </div>
                  <div className='title-column'>
                    Zip Code
                  </div>
                </div>
                <div className='column'>
                  <div className='data-column'>
                    <input
                      className="inputField"
                      type="text"
                      name="patientID"
                      required="required"
                      placeholder="Patient ID"
                      defaultValue={this.state.exams[0].patientID}
                      onChange={console.log("hang in there")}
                    />
                  </div>
                  <div className='data-column'>
                    <input
                      className="inputField"
                      type="number"
                      name="age"
                      required="required"
                      placeholder="Age"
                      defaultValue={this.state.age}
                      onChange={console.log("hang in there")}
                      maxlength="3"
                      />
                  </div>
                  <div className='data-column'>
                    <input
                      className="inputField"  
                      type="text"
                      name="sex"
                      required="required"
                      placeholder="Sex"
                      defaultValue={this.state.sex}
                      onChange={console.log("hang in there")}
                      maxlength="10"
                      />
                  </div>
                  <div className='data-column'>
                    <input
                      className="inputField"
                      type="text"
                      name="bmi"
                      required="required"
                      placeholder="BMI"
                      defaultValue={this.state.BMI}
                      onChange={console.log("hang in there")}
                      maxlength="4"
                      />
                  </div>
                  <div className='data-column'>
                    <input
                        className="inputField"
                        type="text"
                        name="zipCode"
                        required="required"
                        placeholder="ZipCode"
                        defaultValue={this.state.zipCode}
                        onChange={console.log("hang in there")}
                        maxlength="5"
                        />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Exam Card */}
          <div className="card-container">
            <div className="card-title-container">
              <div className="icon-image">
                <img className="icon" src={require('../images/exam-icon.png')} alt="Exam Icon" />
              </div>
              <div>
                <p>Exam</p>
              </div>
            </div>
            <div className="card-data-container">
              <div className='row'>
                <div className='column'>
                  <div className='title-column'>
                    Exam ID
                  </div>
                  <div className='title-column'>
                    Date
                  </div>
                  <div className='title-column'>
                    Brixia Scores
                  </div>
                  <div className='title-column'>
                    Key Findings
                  </div>
                </div>
                <div className='column'>
                  <div className='data-column'>
                  <input
                    className="inputField"
                    type="text"
                    name="_id"
                    required="required"
                    placeholder="Exam ID"
                    defaultValue={this.state.exams[0]._id}
                    onChange={console.log("hang in there")}
                    autoFocus
                    />
                  </div>
                  <div className='data-column'>
                  <DatePicker 
                    wrapperclassName="datePicker"
                    selected={Date.parse(this.state.exams[0].date)} 
                    onChange={console.log('stuck here')}
                    defaultValue={Date.parse(this.state.exams[0].date)}
                    dateFormat='MMM-dd-yy'
                    maxDate = {new Date()} />
                    {/* <input
                    className="inputField"
                    type="date"
                    name="date"
                    required="required"
                    placeholder="Date"
                    defaultValue={this.state.exams[0].date}
                    onChange={console.log("hang in there")}
                    autocomplete="on"
                    /> */}
                  </div>
                  <div className='data-column'>
                    <select
                      type="select"
                      size="1"
                      name="brixiaScores"
                      required="required"
                      placeholder="Brixia Scores"
                      defaultValue={this.state.exams[0].brixiaScores}
                      onChange={console.log("hang in there")}
                      maxlength="2">
                        {_.times(19, (i) => (
                          <option value={i}>{i}</option>
                        ))}
                    </select>
                  </div>
                  <div className='data-column' id="key-findings">
                    <textarea
                        className="paragraph"
                        type="text"
                        name="keyFindings"
                        required="required"
                        placeholder="Key Findings"
                        maxlength="180"
                        defaultValue={this.state.exams[0].keyFindings}
                        onChange={console.log("hang in there")}
                        />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* X-Ray Image Card */}
          <div className="xray-card">
            <a href={this.state.exams[0].xRayImageLink} target="_blank" rel="noopener noreferrer">
            <img className="xray-image" src={this.state.exams[0].xRayImageLink} alt="xRayImage" />
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div>No exams</div>
    )
  }
}
export default ExamInfoEdit