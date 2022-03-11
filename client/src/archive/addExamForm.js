import React, { Component } from 'react';
import './css/addExamForm.css'


//Five boxes for info
//Then 3 buttons for add, update, delete

//helpful URL: https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/?ref=rp
//helpful URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events


class AddExamForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numHours: 17,
            xRayImageLink: "https://www.tbf.org/-/media/tbforg/images/gifts/hack-diversity-logo.gif?h=226&w=250&la=en&hash=2695C4EC5433CE76C7F84BF3134C8501CA64AFBE",
            keyFindings: "",
            brixiaScores: "",
            patientID: "61f69f239180161fg9453e13",
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {

        this.fetching()
        
    }

    async fetching() {
        const exam = JSON.stringify(this.state)
        console.log(exam)

        const options = {

            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json"},
            body: exam
            
        }

        await fetch("http://localhost:3001/exams", options)
        .then(response => response.text())
        .catch(error => console.log('error', error)); 
    }

    render() {
        return (
            <form class='submission-form'>
                <label>Number of hours since the exam</label>
                <input type="number" required={true} 
                    onChange={(e) => this.setState({ numHours: e.target.value })} />
                <br /><br />
                <label>Key Findings</label>
                <textarea className="key-findings-input" type="text" required={true} 
                    value={this.state.keyFindings} onChange={(e) => this.setState({ keyFindings: e.target.value })} />
                <br /><br />
                <label>Brixia Scores</label>
                <input type="text" required={true} 
                    onChange={(e) => this.setState({ brixiaScores: e.target.value })} />
                <br /><br />
                <label>X-ray Image Link</label>
                <input type="text" required={true} 
                    onChange={(e) => this.setState({ xRayImageLink: e.target.value })} />
                <br /><br />
                <label>Patient ID</label>
                <input type="text" required={true}
                    onChange={(e) => this.setState({ patientID: e.target.value })} />
                <br /><br />
                <button id='addBtn' type="submit"
                    value="submit" onClick={this.handleOnSubmit}>submit</button>
            </form>
        )
    }
}

export default AddExamForm;