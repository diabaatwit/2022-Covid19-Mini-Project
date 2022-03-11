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
            examID: "",
        }
        // const exam = "";
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {
        this.fetching()
        //console.log(this.exam)
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:3001/exams/${this.state.examID}`)
        if(response.ok) {
            const exam = response.json();
            console.log(exam);
            // this.exam = response.json();
        }
    }

    render() {
        return (
          <div>
              <label> Please enter Exam ID to be updated</label>
              <input type="text" required={true} 
                            onChange={(e) => this.setState({ examID: e.target.value })} />
              <br></br> 
              <button id='submitBtn' type="submit"
                            value="submit" onClick={this.handleOnSubmit}>Submit</button>
            
          </div>
        )
    }
}

export default UpdateExamForm;