import React, { Component } from 'react';
import './css/admin.css'

class AdminControl extends Component {
    render() {
        return (

            <div class='containerControl'>
                <label class='examList'>Exam List</label>
                
                <a href='/admin/add-exam'><button id='createBtn'>Create Exam</button></a>
                <a href='/admin/delete-exam'><button id='deleteBtn'>Delete Exam</button></a>
                <a href='/admin/update-exam'><button id='updateBtn'>Update Exam</button></a>
                
            </div>

        )
    }
}


export default AdminControl;