import React from 'react'

/**
 * Responsible for creating the admin controls 'Edit List' & 'Create Exam'
 * @param {String} editingStatus current value for the edit button 'Cancel' 'Edit List' 
 * @returns the edit and create new form buttons
 */
export const AdminControls = ({editingStatus, toggleEdit, createExam, isEditing, isNewExamVisable}) => {

    return (
        <div id="edit-buttons">
            <button 
            className={isEditing? "cancel-edit":null} 
            id='edit-list' onClick={()=>{toggleEdit()}}
            >
                {editingStatus}
            </button>

            <button className={isNewExamVisable? "new-exam-active":null}
            id='create-exam' onClick={()=>{createExam()}}
            >
                Create Exam
            </button>
        </div>

    )
}
