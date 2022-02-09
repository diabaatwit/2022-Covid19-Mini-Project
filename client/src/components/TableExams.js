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
        <tr class="exam-card"key={exam._id}> 
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
        </tr>
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

      ) : (
        <div>No exams.</div>
      )
  }


}

export default Table;

