import React, { Component } from 'react';
import './css/addExamForm.css'


//Five boxes for info
//Then 3 buttons for add, update, delete

//helpful URL: https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/?ref=rp
//helpful URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events


class UpdateExamForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numHours: 0,
            xRayImageLink: "",
            keyFindings: "",
            brixiaScores: "",
            patientID: "",
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3001/exams/6217d19117d57d20dec0a052`)
        if(response.ok) {
            const exam = await response.json();//returns an array
            this.setState({
                numHours: exam[0].numHours, 
                xRayImageLink: exam[0].xRayImageLink,
                keyFindings: exam[0].keyFindings,
                brixiaScores: exam[0].brixiaScores,
                patientID: exam[0].patientID
            })
        }
    }

    handleOnSubmit = (e) => {
        this.fetching()
        //console.log(this.exam)
    }

    async fetching() {
        const exam = JSON.stringify(this.state)
        //console.log(exam)

        const options = {

            method: "PATCH",
            mode: "cors",
            headers: { "Content-Type": "application/json"},
            body: exam
        }

        await fetch("http://localhost:3001/exams/6217d19117d57d20dec0a052", options)
        .then(response => response.text())
        .catch(error => console.log('error', error)); 
    }

    

    render() {
        return (
          <div>
              <form class='submission-form'>
                <label> Current Working Exam ID: 6217d19117d57d20dec0a052. Update then click SUBMIT </label>
                <label>Number of hours since the exam</label>
                <input type="number" required={true} value={this.state.numHours} 
                    onChange={(e) => this.setState({ numHours: e.target.value })} />
                <br /><br />
                <label>Key Findings</label>
                <textarea className="key-findings-input" type="text" required={true} value={this.state.keyFindings} 
                    value={this.state.keyFindings} onChange={(e) => this.setState({ keyFindings: e.target.value })} />
                <br /><br />
                <label>Brixia Scores</label>
                <input type="text" required={true} value={this.state.brixiaScores} 
                    onChange={(e) => this.setState({ brixiaScores: e.target.value })} />
                <br /><br />
                <label>X-ray Image Link</label>
                <input type="text" required={true} value={this.state.xRayImageLink} 
                    onChange={(e) => this.setState({ xRayImageLink: e.target.value })} />
                <br /><br />
                <label>Patient ID</label>
                <input type="block" required={true} value={this.state.patientID} 
                    onChange={(e) => this.setState({ patientID: e.target.value })} />
                <br /><br />
                <button id='submitBtn' type="submit"
                            value="submit" onClick={this.handleOnSubmit}>Submit</button>
            </form>
            <br></br> 
            
          </div>
        )
    }
}

export default UpdateExamForm;