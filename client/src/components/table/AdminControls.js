import React from 'react'

export const AdminControls = ({editingStatus, toggleEdit, createExam, isEditing}) => {

  return (
    <div id="edit-buttons">
                <button 
                    className={isEditing? "cancel-edit":null} 
                    id='edit-list' onClick={()=>{toggleEdit()}}>{editingStatus}</button>
                <button id='create-exam' onClick={()=>{createExam()}}>Create Exam</button>
    </div>
              
  )
}
