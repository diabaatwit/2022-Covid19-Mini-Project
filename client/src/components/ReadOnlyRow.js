import React from 'react'
import './css/table.css'
const ReadOnlyRow = ({ exam, handleEditClick }) => {

        return(
            <tr>
                <td>{exam.patientID}</td>
                <td>{exam._id}</td>
                <td>
                  <img className="x-ray" src={exam.xRayImageLink} alt="xRayImage"/>
                </td>
                <td>{exam.keyFindings}</td>
                <td>{exam.brixiaScores}</td>
                <td>{exam.age || "44"}</td>
                <td>{exam.sex || "F"}</td>
                <td>{exam.bmi || "64.1"}</td>
                <td>{exam.zipCode || "01234"}</td>
                <td>
                  <button type ="button" onClick={(event)=> handleEditClick(event, exam)}>Edit</button>
                </td>
              </tr>
        );
    

};

export default ReadOnlyRow