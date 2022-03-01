import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'
import { FaEdit } from "react-icons/fa" 
import { FiX, FiSave } from "react-icons/fi"
import { Link } from 'react-router-dom';

export const TableRender = ({EXAMS, handleEditClick, handleEditFormChange, recordId, editRecordData, cancelEdit, isEditing }) => {

    const columns = COLUMNS
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

    

  return (
      
    <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
                
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        
                    </tr>
                ))}
            
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                    prepareRow(row)

                    return (recordId === row.cells[1].value)? //swap to button view once there is a recordID available for this row
                        //edit view
                        <tr className="edit-view"{...row.getRowProps()}>
                            {row.cells.map( cell => {

                                
                                 return (cell.column.id !== 'button')?//if the column id is not button render regular cell view
                                    <td {...cell.getCellProps()}>
                                        <input 
                                            type="text"
                                            name={cell.column.id}
                                            required="required"
                                            placeholder="Enter Data"
                                            value={editRecordData[cell.column.id]}
                                            onChange={handleEditFormChange}
                                        />
                                    </td>
                                 :
                                    <td>
                                        <div class="button-options-container">
                                    <button className="cancel button-options" type ="button" onClick={()=>cancelEdit()}><FiX/></button>
                                    <button class="save"><FiSave/></button>
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
                                
                            })
                            }
                            
                        </tr>
                    :
                        //read view
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
                                    (cell.column.id === 'patientID' || cell.column.id === '_id')?// now is it a paitient Id or _id for links
                                    
                                        
                                    <td {...cell.getCellProps()}><Link to={
                                        {pathname: (cell.column.id === 'patientID')? '/patient/'+ cell.value : '/exam/' + cell.value}
                                    }>{cell.render('Cell')}</Link></td>
                                      
                                    ://regular cell
                                    <td {...cell.getCellProps()}>{(cell.value)?cell.render('Cell'):1234}</td>
                                    ://button
                                    <td><button className="icon-button" type ="button" onClick={(event)=> {
                                        const rowKey = row.getRowProps().key.split('');
                                        const index = rowKey[rowKey.length-1]
                                        handleEditClick(event, data[index], row.cells[1].value )
                                    }}>{isEditing && <FaEdit/>}</button></td> //if they are editing show edit
                                    
                                }
                                    //checking to see what returns what 
                                    //console.log(row.getRowProps().key, + "" + JSON.stringify(data[0]))
                                    //()=>{console.log(row.getRowProps().key)}
                                    //onClick={(event)=> handleEditClick(event, row.getRowProps())}
                                
                            })
                            }
                            
                        </tr>
                    
                    
                })
            }
            
        </tbody>
    </table>
  )
}
