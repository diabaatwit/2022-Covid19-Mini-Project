import React from 'react'

export const ExamForm = ({handleAddFormChange, handleAddFormSubmit,cancelExam}) => {
  return (
    <div className="create-exam">
              <h2>New Exam:</h2>
              
              <form onSubmit={handleAddFormSubmit}>
                <input
                type="text"
                name="patientID"
                required="required"
                placeholder="Patient ID"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="_id"
                required="required"
                placeholder="Exam ID"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="xRayImageLink"
                required="required"
                placeholder="X-ray URL"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="keyFindings"
                required="required"
                placeholder="Key Findings"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="brixiaScores"
                required="required"
                placeholder="Brixia Scores"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="age"
                required="required"
                placeholder="Age"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="sex"
                required="required"
                placeholder="Sex"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="bmi"
                required="required"
                placeholder="BMI"
                onChange={handleAddFormChange}
                  />
                  <input
                type="text"
                name="zipCode"
                required="required"
                placeholder="Zipcode"
                onChange={handleAddFormChange}
                  />
                  <button type="button" onClick={()=>{   
                      cancelExam()
                      }}>Cancel</button>
                  <button type="submit">Add</button>


              </form>
        </div>
  )
}
