import AllTasks from './AllTasks';
import { Note } from './TypeDef/Notes'
import { useState, createContext, useEffect } from 'react';
import { ColDef,NewValueParams } from 'ag-grid-community';

// Row Data Interface


const InitialData = JSON.parse(localStorage.getItem('data') as string)

export const TasksContext = createContext<{colDefs : ColDef<Note, any>[], rowData : Note[] , setRowData : (value : Note[]) => void} | null>(null)

function App() {

  const [tasks, setTasks] = useState<Note[]>([])

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<Note[]>(InitialData);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<Note>[]>([
    { field: 'id', checkboxSelection: true },
    { field: 'name' },
    { field: 'createdTime' },
    { field: 'endingTime' },
    {
      field: 'status',
      editable : true,
      onCellValueChanged: (params: NewValueParams) => {
        if(params.newValue !== params.oldValue && params.node !== null) {

          let tempArr = [...rowData];
          
          let ch = params.column.getColId();

          if(ch == 'status') {
            tempArr[params.node.rowIndex as number].status = params.newValue
            setRowData(tempArr)
            localStorage.setItem('data', JSON.stringify(tempArr))
          }

        }
        
     }
    } ,
    
    // onselectionchange = () => {
      
    //  }
  ]);
  
  useEffect(() => {
    console.log('Changed');
    localStorage.setItem('data', JSON.stringify(rowData))

  }, [rowData])
  
  return (
    <>
      <TasksContext.Provider value={{ colDefs, rowData, setRowData }} >
        <AllTasks />
      </TasksContext.Provider>
    </>
  );
}

export default App;


