import React from 'react'

const EditableRow = () => {
    return (
        <tr>
            <td>
                <input 
                    type="text"
                    name="patientID"
                    required="required"
                    placeholder="Patient ID"
                ></input>
            </td>
            <td>
                <input 
                    type="text"
                    name="_id"
                    required="required"
                    placeholder="Exam ID"
                ></input>
            </td>
            <td>
                <input 
                    type="text"
                    name="xRayImageLink"
                    required="required"
                    placeholder="X-ray URL">
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="keyFindings"
                    required="required"
                    placeholder="Key Findings">
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="brixiaScores"
                    required="required"
                    placeholder="Brixia Scores"
                    name="patientID">
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="age"
                    required="required"
                    placeholder="Age"
                    name="patientID">
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="sex"
                    required="required"
                    placeholder="Sex">
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="bmi"
                    required="required"
                    placeholder="BMI">
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="zipcode"
                    required="required"
                    placeholder="Zipcode">
                 </input>
            </td>
            
        </tr>

    )
}

export default EditableRow