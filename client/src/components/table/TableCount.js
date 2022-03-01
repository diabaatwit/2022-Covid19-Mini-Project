import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'


export const TableCount = ({exams,filteredExams}) => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => exams, [])

    const {rows} = useTable({columns,data})



  return (
    <div className='exam-count'>
        <h1>Exam List</h1>
        <p style={{fontSize: "20px", color: "grey"}}>{filteredExams.length||rows.length} Exams</p>
    </div>
  )
}
