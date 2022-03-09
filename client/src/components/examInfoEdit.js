import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './css/examPage.css'

class ExamInfo extends Component {
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

  /* fetching exam */
  async componentDidMount() {
    this.fetchData();
  }
  render() {
    const { exams, isLoading, isError } = this.state
    console.log(exams.length)

    //const [searchTerm, setSearchTerm] = useState('')
    if (isLoading) {
      return <div class="loading">Loading Exam...</div>
    }
    if (isError) {
      return <div>Error</div>
    }

    return exams.length > 0 ? (
      <div id="exampage-container">
        <div id="returnhome-link">
          <Link to="/"><FiArrowLeft/> Back to Exam List</Link>
        </div>
        <div id="exampage-titlecontainer">Exam Details

            <a href={'/exam/'+this.state.exams[0]._id+'/edit'}>
              <button id='cancelBtn'>Cancel</button>
            </a>
            <a href={'/exam/'+this.state.exams[0]._id+'/edit'}>
              <button id='saveBtn'>Save</button>
            </a>
            <a href={'/exam/'+this.state.exams[0]._id+'/edit'}>
              <button id='delBtn'>Delete</button>
            </a>
        </div>
        <div id="cards-container">
          {/* Patient Card */}
          <div class="card-container">
            <div class="card-title-container">
              <div class="icon-image">
                <img class="icon" src={require('../images/patient-icon.png')} alt="Patient Icon" />
              </div>
              <div>
                <p>Patient</p>
              </div>
            </div>
            {/* Patient Card */}
            <div class="card-data-container">
              <div class='row'>
                <div class='column'>
                  <div class='title-column'>
                    Patient ID
                  </div>
                  <div class='title-column'>
                    Age
                  </div>
                  <div class='title-column'>
                    Sex
                  </div>
                  <div class='title-column'>
                    BMI
                  </div>
                  <div class='title-column'>
                    Zip Code
                  </div>
                </div>
                <div class='column'>
                  <div class='data-column'>
                    <input
                      class="inputField"
                      type="text"
                      name="patientID"
                      required="required"
                      placeholder="Patient ID"
                      value={this.state.exams[0].patientID}
                    />
                  </div>
                  <div class='data-column'>
                    <input
                      class="inputField"
                      type="text"
                      name="age"
                      required="required"
                      placeholder="Age"
                      value={this.state.age}
                      />
                  </div>
                  <div class='data-column'>
                    <input
                      class="inputField"  
                      type="text"
                      name="sex"
                      required="required"
                      placeholder="Sex"
                      value={this.state.sex}
                      />
                  </div>
                  <div class='data-column'>
                    <input
                      class="inputField"
                      type="text"
                      name="bmi"
                      required="required"
                      placeholder="BMI"
                      value={this.state.BMI}
                      />
                  </div>
                  <div class='data-column'>
                    <input
                        class="inputField"
                        type="text"
                        name="zipCode"
                        required="required"
                        placeholder="ZipCode"
                        value={this.state.zipCode}
                        />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Exam Card */}
          <div class="card-container">
            <div class="card-title-container">
              <div class="icon-image">
                <img class="icon" src={require('../images/exam-icon.png')} alt="Exam Icon" />
              </div>
              <div>
                <p>Exam</p>
              </div>
            </div>
            <div class="card-data-container">
              <div class='row'>
                <div class='column'>
                  <div class='title-column'>
                    Exam ID
                  </div>
                  <div class='title-column'>
                    Date
                  </div>
                  <div class='title-column'>
                    Brixia Scores
                  </div>
                  <div class='title-column'>
                    Key Findings
                  </div>
                </div>
                <div class='column'>
                  <div class='data-column'>
                  <input
                    class="inputField"
                    type="text"
                    name="_id"
                    required="required"
                    placeholder="Exam ID"
                    value={this.state.exams[0]._id}
                    />
                  </div>
                  <div class='data-column'>
                    <input
                    class="inputField"
                    type="date"
                    name="date"
                    required="required"
                    placeholder="Date"
                    value={this.state.exams[0].date}
                    />
                  </div>
                  <div class='data-column'>
                    <p>
                      <input
                        class="inputField"
                        type="text"
                        name="brixiaScores"
                        required="required"
                        placeholder="Brixia Scores"
                        value={this.state.exams[0].brixiaScores}
                        />
                    </p>
                  </div>
                  <div class='data-column' id="key-findings">
                    <input
                        class="inputFieldParagraph"
                        type="text"
                        name="keyFindings"
                        required="required"
                        placeholder="Key Findings"
                        value={this.state.exams[0].keyFindings}
                        />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* X-Ray Image Card */}
          <div class="xray-card">
            <a href={this.state.exams[0].xRayImageLink} target="_blank" rel="noopener noreferrer">
            <img class="xray-image" src={this.state.exams[0].xRayImageLink} alt="xRayImage" />
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div>No exams</div>
    )
  }
}
export default ExamInfo