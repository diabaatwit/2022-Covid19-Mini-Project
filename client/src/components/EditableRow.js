import React from 'react'

const EditableRow = ({editRecordData, handleEditFormChange}) => {
    return (
        <tr>
            <td>
                <input 
                    type="text"
                    name="patientID"
                    required="required"
                    placeholder="Patient ID"
                    value={editRecordData.patientID}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input 
                    type="text"
                    name="_id"
                    required="required"
                    placeholder="Exam ID"
                    value={editRecordData._id}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input 
                    type="text"
                    name="xRayImageLink"
                    required="required"
                    placeholder="X-ray URL"
                    value={editRecordData.xRayImageLink}
                    onChange={handleEditFormChange}
                    >
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="keyFindings"
                    required="required"
                    placeholder="Key Findings"
                    value={editRecordData.keyFindings}
                    onChange={handleEditFormChange}
                    >
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="brixiaScores"
                    required="required"
                    placeholder="Brixia Scores"
                    name="patientID"
                    value={editRecordData.brixiaScores}
                    onChange={handleEditFormChange}
                    >
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="age"
                    required="required"
                    placeholder="Age"
                    name="patientID"
                    value={editRecordData.age}
                    onChange={handleEditFormChange}
                    >
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="sex"
                    required="required"
                    placeholder="Sex"
                    value={editRecordData.sex}
                    onChange={handleEditFormChange}
                    >
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="bmi"
                    required="required"
                    placeholder="BMI"
                    value={editRecordData.bmi}
                    onChange={handleEditFormChange}
                    >
                 </input>
            </td>
            <td>
            <input 
                    type="text"
                    name="zipCode"
                    required="required"
                    placeholder="Zipcode"
                    value={editRecordData.zipCode}
                    onChange={handleEditFormChange}
                    >
                 </input>
            </td>
            <td>
                <button type="submit">Save</button>
            </td>
            
        </tr>

    )
}

export default EditableRow