import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import {COLUMNS} from './columns'


export const TableRender = ({EXAMS,searchTerm}) => {

    

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
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map( cell => {
                                try {
                                    new URL(cell.value); //checking to see if it is an image
                                    return(
                                    <td {...cell.getCellProps()}>
                                            <img className="x-ray" src={cell.value} alt="xRayImage"/>
                                    </td>
                                    )
                                } catch (_){ 
                                    return (cell.column.id !== 'button')?<td {...cell.getCellProps()}>{(cell.value)?cell.render('Cell'):1234}</td>:
                                    <td><button type ="button" >Edit</button></td>
                                }
                                   
                                    
                                })
                            }
                            
                        </tr>
                    )
                })
            }
            
        </tbody>
    </table>
  )
}
