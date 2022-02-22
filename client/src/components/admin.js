import React, { Component } from 'react';
import './admin.css'

class AdminControl extends Component {
    render() {
        return (

            <div class='containerControl'>
                <label class='examList'>Exam List</label>
                
                <a href='/admin/add-exam'><button id='createBtn'>Create Exam</button></a>
                
            </div>

        )
    }
}


export default AdminControl;