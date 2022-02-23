import React from 'react'
import './css/table.css'
const ReadOnlyRow = ({ exam }) => {

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
                <td>{exam.zipcode || "01234"}</td>
              </tr>
        );
    

};

export default ReadOnlyRow