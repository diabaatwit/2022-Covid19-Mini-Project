import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
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
      BMI: "",
      date: ""
    }
  }
  redirectTo(){
    window.location.href="/exam/"+ this.state.exams[0]._id +"/edit";
    console.log('it works');
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
        const date = this.state.patients[0].date
        this.setState({ age, sex, zipCode, BMI, date })

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
      return <div className="loading">Loading Exam...</div>
    }
    if (isError) {
      return <div>Error</div>
    }

    return exams.length > 0 ? (
      <div id="exampage-container">
        <div id="returnhome-link">
          <Link to="/"><FiArrowLeft/> Back to Exam List</Link>
        </div>
        <div id="exampage-titlecontainer">
            <div>Exam Details
            </div>
            <div id="exampage-editbutton">
              <a href={'/exam/'+this.state.exams[0]._id+'/edit'}>
                <button id='editBtn'>Edit</button>
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
                  <div className='data-column-read-only'>
                    {this.state.exams[0].patientID}
                  </div>
                  <div className='data-column-read-only'>
                    {this.state.age}
                  </div>
                  <div className='data-column-read-only'>
                    {this.state.sex}
                  </div>
                  <div className='data-column-read-only'>
                    {this.state.BMI}
                  </div>
                  <div className='data-column-read-only'>
                    {this.state.zipCode}
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
            <div className="card-data-container-read-only">
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
                  <div className='data-column-read-only'>
                    {this.state.exams[0]._id}
                  </div>
                  <div className='data-column-read-only'>              
                    {(this.state.exams[0].date).split(' ').splice(1,4).join("-")}
                  </div>
                  <div className='data-column-read-only'>
                    <p id="brixia-background">{this.state.exams[0].brixiaScores}</p>
                  </div>
                  <div className='data-column-read-only' id="key-findings-read-only">
                    {this.state.exams[0].keyFindings}
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
export default ExamInfo