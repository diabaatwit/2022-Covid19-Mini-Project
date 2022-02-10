import React, { Component } from 'react'
import './table.css'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exams: [],
      isLoading: false,
      isError: false
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:3001/exams');
    if (response.ok) {
      const exams = await response.json()
      console.log(exams)
      this.setState({ exams, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
      //console.log(error)

    }
  }

  renderTableHeader = () => {
    return Object.keys(this.state.exams[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  }

  examRecordCard = () => {
    return this.state.exams.map(exam => {
      return (

        <div class ="exam-card" key={exam.id}>
          
          <div class="card-item xray-box">
            <img class="xray" src={exam.xRayImageLink} alt="xRayImage"/>
          </div>
          <div class="spacer"/>
          <div class="card-item brixia-scores"><span>{exam.brixiaScores}</span></div>
          <div class="spacer"/>
          <div class="card-item exam-id"><span>{exam._id}</span></div>
          <div class="spacer"/>
          <div class="card-item patient-id"><span>{exam.patientID}</span></div>
          <div class="spacer"/>
          <div class="card-item key-findings"><span>{exam.keyFindings}</span></div>
          <div class="spacer"/>
          <div class="card-item age"><span>23</span></div>
          <div class="spacer"/>
          <div class="card-item sex"><span>F</span></div>
          <div class="spacer"/>
          <div class="card-item bmi"><span>21</span></div>
          <div class="spacer"/>
          <div class="card-item zip-code"><span>0000</span></div>
         
          
        </div>

        /*<div class="card-item age"><span>{exam.age}</span></div>
          <div class="card-item sex"><span>{exam.sex}</span></div>
          <div class="card-item bmi"><span>{exam.bmi}</span></div>
          <div class="card-item zip-code"><span>{exam.zipCode}</span></div>
          */

        /*<tr class="exam-card"key={exam._id}> 
          <td>
            <div class="card-item">
              <img class="xray" src={exam.xRayImageLink} alt="xRayImage"/>
            </div>
          </td>
          <td><div class="card-item brixia-scores">{exam.brixiaScores}</div></td>
          <td><div class="card-item exam-id">{exam._id}</div></td>
          <td><div class="card-item patient-id">{exam.patientID}</div></td>
          <td><div class="card-item key-findings">{exam.keyFindings}</div></td>
          <td><div class="card-item age">{exam.age}</div></td>
          <td><div class="card-item sex">{exam.sex}</div></td>
          <td><div class="card-item bmi">{exam.bmi}</div></td>
          <td><div class="card-item zip-code">{exam.zipCode}</div></td>
        </tr>*/
      )
    })
  }

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
          <div class = "header-exam">
           <div>IMG</div>
           <div>Brixia Scores</div>
           <div> Exam ID</div>
           <div> Patient ID</div>
           <div> Key Findings</div>
           <div> Age</div>
           <div> Sex</div>
           <div> Zip Code</div>
           
          </div>
          
          <div class="list-exam">
            {this.examRecordCard()}
          </div>

        </div>
  /*
        <div class='container'>
          <table>
            <thead class="patient-head">
              <tr>
                <th>Img</th>
                <th>Brixia Scores</th>
                <th>Exam Id</th>
                <th>Patient Id</th>
                <th>Key Findings</th>
                <th>Age</th>
                <th>Sex</th>
                <th>BMI</th>
                <th>Zip Code</th>
                
              </tr>
            </thead>
            <tbody>
    
                {this.examRecordCard()}
                
            </tbody>
          </table>
        </div>
*/
      ) : (
        <div>No exams.</div>
      )
  }


}

export default Table;

