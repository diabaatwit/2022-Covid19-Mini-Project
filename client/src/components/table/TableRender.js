import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'
import { FaEdit, FaTrashAlt } from "react-icons/fa" 
import { FiX, FiSave } from "react-icons/fi"
import { Link } from 'react-router-dom';

/**
 * This Component is responsible for rendering the table to be used in TableExams.js
 * @param {Object} EXAMS contains all exams from Table Exams
 * @param {Function} handleEditClick handles when the edit button is clicked
 * @param {Function} handleEditFormChange handles the onChange event for editable table view
 * @param {String} recordId contains the exam ID to find which table to edit
 * @param {Object} editRecordData contains a copied (edited) list of the current exam properties
 * @param {Function} cancelEdit handles the onClick event for the Xmark button on editable rows
 * @param {Boolean} isEditing true or false depending on if someone has clicked on the <AdminControls>'s edit list button
 * @returns The rendered table displaying all the data
 */
export const TableRender = ({EXAMS, handleEditClick, handleEditFormChange, handleAddFormSubmit, recordId, editRecordData, cancelEdit, isEditing, deleteExam }) => {
    
    //Ensures that if the same data is past through, it remembers the output instead of recomputing 
    const columns = useMemo(() => COLUMNS, [])
    const data = EXAMS

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    //returns the table
    return (
        /**
         * @param false returns false because it is not a form (<ExamForm>)
         */
        <form onSubmit={(event)=>{handleAddFormSubmit(event,false)}}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map( column => (
                            (recordId)?
                            //is column in edit view
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>                 
                            ://is column x-ray
                            (column.id === 'xRayImageLink')?
                                    <th {...column.getHeaderProps()}>{"Key Findings"}</th>
                            ://is column key findings
                            (column.id === 'keyFindings')?
                                    <th {...column.getHeaderProps()}></th>
                            ://render normal
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                        
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        
                        /**
                         * the idea here is that only one view for a given row will need to be shown.
                         * So if someone clicks the edit button on a read only row, it will store that 
                         * exams ID. This table then checks to see first if there are any IDs it needs to be aware of,
                         * if there is, it renders an editable version of that row instead. 
                         * 
                         * for each cell it will check to see if it needs to be either an image (with a valid url),
                         * patientID, ExamID, or button. 
                         */
                        return (recordId === row.cells[1].value)? //swap to button view once there is a recordID available for this row
                            //edit view
                            <tr className="edit-view"{...row.getRowProps()}>
                                {row.cells.map( cell => {


                                    return (cell.column.id !== 'button')?//if the column id is not button, render regular cell view
                                    //editable cells
                                        <td {...cell.getCellProps()}>
                                            <input 
                                                disabled={cell.column.id==="_id"}
                                                type="text"
                                                name={cell.column.id}
                                                required="required"
                                                placeholder="Enter Data"
                                                value={editRecordData[cell.column.id]}
                                                onChange={(event)=>{ handleEditFormChange(event);}}
                                            />
                                        </td>
                                    ://renders the X and save icons
                                        <td>
                                            <div className="button-options-container">
                                                <button className="cancel button-options"
                                                        type ="button" onClick={()=>cancelEdit()}><FiX/>
                                                </button>
                                                <button class="save" type="submit" ><FiSave/></button>
                                            </div>
                                        </td>
                                        /**
                                        * If I know the cell then there must be data linking it to it's column, if I know the column I know the
                                        * accessor, if I know that then I must be able to access the index of editRecordData that I want
                                        * by prinitng out these calls, I can see what each string of commands gives me.
                                        */
                                        //(event)=>handleEditFormChange(event,editRecordData)
                                        //console.log(row.cells[1].value) //row id
                                        //console.log(editRecordData)
                                        //()=> {console.log(cell.column.id)}
                                        //console.log(row.getRowProps().key, + "" + JSON.stringify(data[0]))

                                })}

                            </tr>
                        ://read view
                            <tr {...row.getRowProps()}>
                                {row.cells.map( cell => {

                                    //try to see if the image is a valid url, if not catch then render a regular cell view
                                    try { 
                                        new URL(cell.value); 
                                    return(
                                        //photo cell
                                        <td {...cell.getCellProps()}>
                                            <a href={cell.value} target="_blank">
                                                <div className='image-container'>
                                                    <img className="x-ray" src={cell.value} alt="xRayImage"/>
                                                </div>
                                            </a>
                                        </td>
                                    )
                                    } catch (_){ 

                                        return (cell.column.id !== 'button')?//if the column id is not button render regular cell view
                                        //Read Cells
                                            (cell.column.id === 'patientID' || cell.column.id === '_id')?// now is it a paitient Id or _id for links

                                            //Linked Cell
                                                <td {...cell.getCellProps()}><Link to={
                                                {pathname: (cell.column.id === 'patientID')? '/patient/'+ cell.value : '/exam/' + cell.value}
                                                }>{cell.render('Cell')}</Link></td>

                                            ://regular cell
                                                <td className={(cell.column.id === 'keyFindings')? 'key-exam': null}{...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ://Edit button
                                            <td>{
                                                    isEditing && //if there are no edits don't render edit button
                                                <div className="button-options-container">
                                                    <button className="icon-button" type ="button" onClick={(event)=> {
                                                        const rowKey = row.getRowProps().key.split('');
                                                        const index = rowKey[rowKey.length-1]
                                                        handleEditClick(event, data[index], row.cells[1].value )
                                                    }}> 
                                                        <FaEdit/>
                                                    </button>
                                                    <button 
                                                        className='icon-button trash-button'
                                                        onClick={(event)=>{
                                                        const rowKey = row.getRowProps().key.split('');
                                                        const index = rowKey[rowKey.length-1]
                                                        deleteExam(event,data[index])}
                                                    }>
                                                        <FaTrashAlt/>
                                                    </button>
                                                </div>
                                                    }
                                            </td>

                                    }
                                    //checking to see what returns what 
                                    //console.log(row.getRowProps().key, + "" + JSON.stringify(data[0]))
                                    //()=>{console.log(row.getRowProps().key)}
                                    //onClick={(event)=> handleEditClick(event, row.getRowProps())}

                                })}

                            </tr>


                        })
                    }

                </tbody>
            </table>
        </form>
    )
}
