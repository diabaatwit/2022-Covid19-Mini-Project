import React, {Component} from 'react';
import './examForm.css'


//Five boxes for info
//Then 3 buttons for add, update, delete

//helpful URL: https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/?ref=rp
//helpful URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events


class ExamForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numHours: "17",
            xRayImageLink: "https://www.tbf.org/-/media/tbforg/images/gifts/hack-diversity-logo.gif?h=226&w=250&la=en&hash=2695C4EC5433CE76C7F84BF3134C8501CA64AFBE",
            keyFindings: "",
            brixiaScores: [],
            patientID: "61f69f239180161fg9453e13",
            count: 0
        }
        this.handleOnSubmit =  this.handleOnSubmit.bind(this);
    }

    handleOnSubmit =  (e) => {
        
    }

    render() {
        return(
            <div className ="form-inputs">
                <form action="" onSubmit={this.handleOnSubmit()}>
                    <input type="text" required={true} placeholder="Number of Hours" 
                    defaultValue={this.state.numHours} onChange={(e) => this.setState({ numHours: e.target.value }) } />
                    <input className="key-findings" type="text" required={true} placeholder="Key Findings" 
                    defaultValue={this.state.keyFindings} onChange={(e) => this.setState({ keyFindings: e.target.value }) } />
                    <input type="text" required={true} placeholder="Brixia Scores" 
                    defaultValue={this.state.brixiaScores} onChange={(e) => this.setState({ brixiaScores: e.target.value }) } />
                    <input type="text" required={true} placeholder="X-ray Image Link" 
                    defaultValue={this.state.xRayImageLink} onChange={(e) => this.setState({ xRayImageLink: e.target.value }) } />
                    <input type="text" required={true} placeholder="Patient ID" 
                    defaultValue={this.state.patientID} onChange={(e) => this.setState({ patientID: e.target.value }) } /> 
                    <button type="submit"
                    value="submit">submit</button>
                </form>
                <button className ="state-button" onClick={() => console.log(this.state)}> STATE WITH CURRENT VALUES </button>
                <button className ="counter" onClick={() => this.setState({ count: this.state.count+1 })}> {this.state.count} </button>
            </div>
        )
    }
}

export default ExamForm;