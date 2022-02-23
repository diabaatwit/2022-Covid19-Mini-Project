import React, { Component } from 'react';
import './css/deleteExamForm.css'


class DeleteExamForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            examID: "",
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = (e) => {
        this.fetching();
    }

    async fetching() {
        const options = {
            method: "DELETE",
        }

        await fetch(`http://localhost:3001/exams/${this.state.examID}`, options)
        .then(response => response.text())
        .catch(error => console.log('error', error)); 
    }

    render () {
        return (
            <div> 
                <form class='submission-form'>
                    <label> Please Enter Exam ID to be deleted</label>
                    <input type="text" required={true} 
                            onChange={(e) => this.setState({ examID: e.target.value })} />
                    <br /><br />
                    <button id='submitBtn' type="submit"
                            value="submit" onClick={this.handleOnSubmit}>Submit</button>
                </form>
            </div>
        )
    }
    
}

export default DeleteExamForm;
    
