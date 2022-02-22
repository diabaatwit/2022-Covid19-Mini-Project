import React, { Component } from 'react';
import './examForm.css'


//Five boxes for info
//Then 3 buttons for add, update, delete

//helpful URL: https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/?ref=rp
//helpful URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events


class ExamForm extends Component {
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

        /*const scores = []
        console.log(typeof(scores))
        for (let i in this.state.brixiaScores){
            scores[i] = this.state.brixiaScores.charAt(i)
        }


        //const scores = [(this.state.brixiaScores).split(',')]
        console.log(scores)
        console.log(typeof(scores))

        this.setState({brixiaScores: scores})


        console.log(typeof(this.state.brixiaScores))*/
        const exam = this.state
        console.log(exam)
        fetch("http://localhost:3001/exams", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "no-cors",
            body: JSON.stringify(exam)
            
        }).then(() => {
            console.log("exam added successfully")
        })
    }

    render() {
        return (
            <div className="form-inputs">
                <input type="number" required={true} placeholder="Number of Hours"
                    value={this.state.numHours} onChange={(e) => this.setState({ numHours: e.target.value })} />
                <br /><br />
                <input className="key-findings" type="text" required={true} placeholder="Key Findings"
                    value={this.state.keyFindings} onChange={(e) => this.setState({ keyFindings: e.target.value })} />
                <br /><br />
                <input type="text" required={true} placeholder="Brixia Scores"
                    value={this.state.brixiaScores} onChange={(e) => this.setState({ brixiaScores: e.target.value })} />
                <br /><br />
                <input type="text" required={true} placeholder="X-ray Image Link"
                    value={this.state.xRayImageLink} onChange={(e) => this.setState({ xRayImageLink: e.target.value })} />
                <br /><br />
                <input type="text" required={true} placeholder="Patient ID"
                    value={this.state.patientID} onChange={(e) => this.setState({ patientID: e.target.value })} />
                <br /><br />
                <button type="submit"
                    value="submit" onClick={this.handleOnSubmit}>submit</button>
                <button className="state-button" onClick={() => console.log(this.state)}> STATE WITH CURRENT VALUES </button>
            </div>
        )
    }
}

export default ExamForm;