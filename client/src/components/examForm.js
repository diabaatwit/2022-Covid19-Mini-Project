import React, {Component, useState} from 'react';


// 
//Nine boxes for info
//Then 3 buttons for add, update, delete

//helpful URL: https://www.geeksforgeeks.org/how-to-connect-mongodb-with-reactjs/?ref=rp
//helpful URL: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events


class ExamForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numHours: "",
            xRayImageLink: "",
            keyFindings: "",
            brixiaScores: "",
            patientID: "",
            count: 0
        }
    }

    render() {
        return(
            <div className ="form-inputs">
                <button>Add</button>
                <input placeholder='numHours?'></input>
                <input placeholder='X-ray Image Link'></input>
                <input placeholder='Key Findings'></input>
                <input placeholder='Brixia Scores'></input>
                <input placeholder='Patient ID'></input>
                <button>Delete</button>
                <button>Update</button>
                <button onClick={() => this.setState({ count: this.state.count+1 })}> {this.state.count} </button>
            </div>
        )
    }
}

export default ExamForm;