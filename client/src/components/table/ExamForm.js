import React from 'react';
import {FiX,FiPlus} from 'react-icons/fi';

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * 
 * @param {Function} handleAddFormChange function for recorded added changes to form
 * @param {Function} handleAddFormSubmit responsible for the submit when the form is completed
 * @param {Function} cancelExam toggles the isNewExamVisable boolean in <TableExams> which stops this from rendering 
 * @returns 
 */
export const ExamForm = ({handleAddFormChange, handleAddFormSubmit,cancelExam}) => {
  const [startDate, setStartDate] = useState(new Date());
  let handleChange = (date, event) => {
    setStartDate(date); 
    handleAddFormChange(event, date);
    console.log('THIS IS THE DATE' + date);
  }

  return (
    //this is not very dynamic but I'm not very worried about that right now
    <div className="create-exam">
      <form onSubmit={(event)=>handleAddFormSubmit(event,true)}>
        <table>
          <thead>
            <tr><h2>New Exam:</h2></tr>
            <tr>

              <th>Patient ID</th>
              <th>Date</th>
              <th>X-Ray URL</th>
              <th>Key Findings</th>
              <th> Brixia Score</th>

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
              <DatePicker 
                selected={startDate} 
                type="date"
                name="date" 
                onChange={handleChange} 
                defaultValue={startDate}
                dateFormat='dd/MM/yyyy'
                maxDate = {new Date()} />
              {/* <input hidden
              type="text"
              name="date"
              required="required"
              placeholder="Date"
              onChange={handleAddFormChange}
              /> */}
              </td>
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
                <button className="cancel" type="button" onClick={()=>cancelExam()}><FiX/></button></td>
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
