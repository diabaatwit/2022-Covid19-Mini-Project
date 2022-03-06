import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Table from './table/TableExams';
import './css/examPage.css'

class PatientInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          patients: [],
          isLoading: false,
          isError: false,         
        }
        
      }


      
    /* fetching patient */
    async componentDidMount() {
        this.setState({ isLoading: true })
        var url = window.location.pathname
        console.log(url)
        var id = url.split("/")
        console.log(id[2])
        const response = await fetch('http://localhost:3001/patients/' + id[2]);
        if (response.ok) {
            const patients = await response.json()
            console.log(patients)
            console.log(typeof(patients))
            this.setState({ patients, isLoading: false })
            console.log(this.state.patients._id)
        } else {
            this.setState({ isError: true, isLoading: false })
            //console.log(error)

        }

    }



    patientData = () => {
        
        return this.state.patients.map(patient => {
            
            return (
                
                <div key={patient._id}>
                    <div>{patient._id}</div>
                    <div>{patient.name}</div>
                    <div>{patient.age}</div>
                    <div>{patient.sex}</div>
                    <div>{patient.email}</div>
                    <div>{patient.phoneNumber}</div>
                    <div>{patient.address}</div>
                    <div>{patient.city}</div>
                    <div>{patient.state}</div>
                    <div>{patient.zipCode}</div>
                </div>

            )
        })
    }

    


    render() {
        const { patients, isLoading, isError } = this.state
        console.log(patients.length)
        //const [searchTerm, setSearchTerm] = useState('')
    
        if (isLoading) {
          return <div class="loading">Loading Patient...</div>
        }
    
        if (isError) {
          return <div>Error</div>
    
        }
    
        return  patients.length > 0 ? (
          <div id="exampage-container">
            <div id="returnhome-link">
                <img src={require('../images/arrow-icon2.png')} alt="Arrow Icon" />
                <Link to ="/"> Back to Home Page</Link>
            </div><br/>
            <div id="exampage-label">Patient Details</div>
            <div id="cards-container">
                  {/* Patient Card Title*/}
                  <div class="card-container">
                  <div class="card-title-container">
                        <div>
                          <img src={require('../images/patient-icon.png')} alt="Patient Icon" />
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
                        {this.state.patients[0]._id}
                      </div>
                      <div class='data-column'>
                        {this.state.patients[0].age}
                      </div>
                      <div class='data-column'>
                        {this.state.patients[0].sex}
                      </div>
                      <div class='data-column'>
                        {this.state.patients[0].BMI}
                      </div>
                      <div class='data-column'>
                        {this.state.patients[0].zipCode}
                      </div>
                      </div>
                    </div>  
                  </div>
                </div>
            </div><br/>
            {/* <div>{this.patientData()}</div> */}
            <Table />
          </div>
          ) : (
            <div>No patients</div>
          )
      }
}

export default PatientInfo
