import React from 'react'
import {FiX,FiPlus} from 'react-icons/fi'

export const ExamForm = ({handleAddFormChange, handleAddFormSubmit,cancelExam,isEditing}) => {
  return (
    //this is not very dynamic but I'm not very worried about that right now
    <div className="create-exam">
          <form onSubmit={handleAddFormSubmit}>
            <table>
              <thead>
                <tr><h2>New Exam:</h2></tr>
                <tr>
                  <th>Patient name</th>
                  <th>Exam ID</th>
                  <th>Key Findings</th>
                  <th>X-Ray URL</th>
                  <th> Brixia Score</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>BMI</th>
                  <th>Zipcode</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
            <tbody>
          
              <tr >
                <td>
                <input
                type="text"
                name="patientID"
                required="required"
                placeholder="Patient ID"
                onChange={handleAddFormChange}
                  />
                  </td>
                  <td>
                  <input
                type="text"
                name="_id"
                required="required"
                placeholder="Exam ID"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <input
                type="text"
                name="xRayImageLink"
                required="required"
                placeholder="X-ray URL"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <input
                type="text"
                name="keyFindings"
                required="required"
                placeholder="Key Findings"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <input
                type="text"
                name="brixiaScores"
                required="required"
                placeholder="Brixia Scores"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <input
                type="text"
                name="age"
                required="required"
                placeholder="Age"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <input
                type="text"
                name="sex"
                required="required"
                placeholder="Sex"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <input
                type="text"
                name="bmi"
                required="required"
                placeholder="BMI"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <input
                type="text"
                name="zipCode"
                required="required"
                placeholder="Zipcode"
                onChange={handleAddFormChange}
                  /></td>
                  <td>
                  <button className="cancel" type="button" onClick={()=>{   
                      cancelExam()
                      }}><FiX/></button></td>
                    <td>
                  <button id="add" type="submit"><FiPlus/></button>
                  </td>


              
              </tr>
              </tbody>
            </table>
          </form>
        </div>
  )
}
