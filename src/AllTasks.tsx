import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

import { Note } from './TypeDef/Notes'
import { useContext } from 'react';

import { TasksContext } from './App'

const AllTasks = () => {

    const data = useContext(TasksContext) as {colDefs : ColDef<Note, any>[], rowData : Note[] , setRowData : (value : Note[]) => void} | null

    console.log(data);
    
    const selectedRows = new Set<number>()

    return (
        <div
            className={
                "ag-theme-quartz"
            }
            style={{ width: '100vw', height: '50vh' }}
            >
            {
                data && <AgGridReact 
                
                            rowSelection={'multiple'} 
                            rowData={data.rowData} 
                            columnDefs={data.colDefs} 
                            onSelectionChanged={(e) => {
                                console.log(e);
                            }}
                            onRowSelected={(e) => {
                                console.log(e.rowIndex);
                                if(selectedRows.has(e.rowIndex as number)) {
                                    selectedRows.delete(e.rowIndex as number)
                                }else {
                                    selectedRows.add(e.rowIndex as number)
                                }

                                console.log(selectedRows);
                                
                            }}

                            
                        />
            }
            <button onClick={() => {
                if(data) {
                    let tempArr = [...data.rowData]
                    selectedRows.forEach(e => {
                        console.log(e);
                        tempArr.splice(e, 1)
                    })

                    data.setRowData(tempArr)
                }

            }}>Delete Selected Rows</button>
            
        </div>
    )
}

export default AllTasks