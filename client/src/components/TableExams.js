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

  renderTableRows = () => {
    return this.state.exams.map(exam => {
      return (
        <tr key={exam._id}>
          <td>{exam._id}</td>
          <td>{exam.patientID}</td>
        </tr>
      )
    })
  }

  render() {
    const { exams, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>

    }

    return exams.length > 0
      ? (

        <div class='container'>
          <table>
            <thead>
              <tr>
                <th>Exam Id</th>
                <th>Patient Id</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRows()}
            </tbody>
          </table>
        </div>

      ) : (
        <div>No exams.</div>
      )
  }


}

export default Table;

