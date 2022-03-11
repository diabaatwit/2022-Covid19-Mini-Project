import React from 'react';

/**
 * responsible for rendering table count
 * @param {Object} exams all the current exams
 * @param {Object} filteredExams filtered list of the current exams
 * @returns table count
 */
export const TableCount = ({examCount}) => {

  return (
    <div className='exam-count'>
      <h1>Exam List</h1>
      <p style={{fontSize: "20px", color: "grey"}}>{examCount.length} Exams</p>
    </div>
  )
}
