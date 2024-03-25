import { useEffect, useState } from 'react'
import './app.scss'
import GetColumnsHook from './context/getColumnsHook'
import { ColumnsProps } from './types/colmuns'
import ColumnBar from './components/column'
import DimensionBox from './components/DimensionBox'
import SnackBar from './components/toast'

function App() {
  // this always rerender on state changes in one of the other states
  const { columns, error, isLoading } = GetColumnsHook() 
  const [ selectedColumns, setSelectedColumns ] = useState<ColumnsProps[]>([])
  const [ pickColumn, setPickColumn ] = useState<ColumnsProps[]>([])
  const [ measurements, setMeasurments ] = useState<ColumnsProps[]>([])

  const  handleDragStart = (e : React.DragEvent<HTMLDivElement>) => {
    const value : ColumnsProps = {function: e.currentTarget.id, name: e.currentTarget.innerHTML }
    e?.dataTransfer.setData("columnsType",JSON.stringify(value))
    console.log({ 'dragStart': e })
  }


  const handleOnDropDimension = (e: React.DragEvent<HTMLDivElement>) => {
    const columnVal = JSON.parse(e.dataTransfer.getData("columnsType")) as ColumnsProps;
    console.log({'handleDrop': columnVal })
    if(columnVal.function != "dimension") return
    const findElement = columns?.find((val) => val.name === columnVal.name)
    if(findElement) {
      setSelectedColumns([... selectedColumns, findElement])
      const filteredColumns = pickColumn.filter((val) => val !== findElement)
      setPickColumn([... filteredColumns])
    } 
  }


  const handleOnDropMeasurment = (e: React.DragEvent<HTMLDivElement>) => {
    const columnVal = JSON.parse(e.dataTransfer.getData("columnsType")) as ColumnsProps
    console.log({'handleDrop': columnVal })
    if(columnVal.function != "measure") return
    const findElement = columns?.find((val) => val.name === columnVal.name)
    if(findElement) {
      setMeasurments([... measurements, findElement])
      const filteredColumns = pickColumn.filter((val) => val !== findElement)
      setPickColumn([... filteredColumns])
    } 
  }
  // console.log({ columns, error, isLoading })

  const handleRemoveItem = (el: ColumnsProps) => {
    const filteredItem =selectedColumns.filter((val) => val !== el)
    setSelectedColumns([... filteredItem])
    setPickColumn([... pickColumn, el])
  }

  const handleRemoveMeasurementItem = (el: ColumnsProps) => {
    const filteredItem =measurements.filter((val) => val !== el)
    setMeasurments([ ... filteredItem ])
    setPickColumn([... pickColumn, el])
  }

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement> | undefined) =>{
    e?.preventDefault()
  }

  useEffect(() => {
    if(columns){
      setPickColumn([... columns])
    }
  },[columns])

  return (
    <div className='layout'>
      <SnackBar message='THis is a message' onClose={() => {}} open={true} />
      <div className='column'>
        <h1>Columns</h1>
        {
          pickColumn?.map((val, idx) => (
            <>
              <ColumnBar key={idx} title={val.name} onDragStart={handleDragStart} type={val.function}  />
            </>
          ))
        }
      </div>
      <div>
        <h1>Plotter</h1>
        {/* <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className='dimensions_measures' >
          Place Here
          {
            selectedColumns.map((val) => (
              <>
                {val.name}
              </>
            ))
          }
        </div> */}
        <div>
          <span>Dimensions:</span>
          <DimensionBox 
            removeItem={handleRemoveItem} 
            elements={selectedColumns} 
            handleOnDrop={handleOnDropDimension} 
            handleOnDragOver={handleOnDragOver} 
            onReset={() => console.log("reset")}
            handleOnDragStart={handleDragStart}
          />
        </div>
        <div>
          <span>Measurments:</span>
          <DimensionBox 
            removeItem={handleRemoveMeasurementItem} 
            elements={measurements} 
            handleOnDrop={handleOnDropMeasurment} 
            handleOnDragOver={handleOnDragOver} 
            onReset={() => console.log("reset")}
            handleOnDragStart={handleDragStart} 
          />
        </div>
      </div>
    </div>
  )
}

export default App
