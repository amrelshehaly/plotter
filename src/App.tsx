import { useEffect, useMemo, useState } from 'react'
import './app.scss'
import GetColumnsHook from './hooks/getColumnsHook'
import { ColumnsProps, DataPlotTypes, FunctionEnum } from './types/colmuns'
import ColumnBar from './components/column'
import DimensionBox from './components/DimensionBox'
import SnackBar from './components/toast'
import LinearGraph from './components/lineargraph'
import GetDataHook from './hooks/getDataHook'
import LoadingSpinner from './components/loader'

function App() {
  const { columns, error, isLoading, clearError, isError } = GetColumnsHook() 
  const [ pickColumn, setPickColumn ] = useState<ColumnsProps[]>([])

  const [ dimensions, setDimensions ] = useState<ColumnsProps[]>([])
  const [ measurements, setMeasurments ] = useState<ColumnsProps[]>([])


  const { data, error: dataError, isLoading: loadingData, setParams, clearError: clearErrorData , isError: isErrorData } = GetDataHook()

  const  handleDragStart = (e : React.DragEvent<HTMLDivElement>) => {
    const value : ColumnsProps = {function: e.currentTarget.id as FunctionEnum, name: e.currentTarget.innerHTML }
    e?.dataTransfer.setData("columnsType",JSON.stringify(value))
  }


  const handleOnDropDimension = (e: React.DragEvent<HTMLDivElement>) => {
    const columnVal: ColumnsProps = JSON.parse(e.dataTransfer.getData("columnsType"));
    if(columnVal.function != "dimension") return;
    const findElement = columns?.find((val) => val.name === columnVal.name);
    if(findElement) {
      setDimensions([... dimensions, findElement]);
      const filteredColumns = pickColumn.filter((val) => val !== findElement);
      setPickColumn([... filteredColumns]);
    } 
  }


  const handleOnDropMeasurment = (e: React.DragEvent<HTMLDivElement>) => {
    const columnVal: ColumnsProps = JSON.parse(e.dataTransfer.getData("columnsType"));
    if(columnVal.function != "measure") return
    const findElement = columns?.find((val) => val.name === columnVal.name)
    if(findElement) {
      setMeasurments([... measurements, findElement])
      const filteredColumns = pickColumn.filter((val) => val !== findElement)
      setPickColumn([... filteredColumns])
    } 
  }

  const handleRemoveDimensionItem = (el: ColumnsProps) => {
    const filteredItem = dimensions.filter((val) => val !== el)
    setDimensions([... filteredItem])
    setPickColumn([... pickColumn, el])
  }

  const handleRemoveMeasurementItem = (el: ColumnsProps) => {
    const filteredItem =measurements.filter((val) => val !== el)
    setMeasurments([ ... filteredItem ])
    setPickColumn([... pickColumn, el])
  }

  const handleReset = (type :FunctionEnum) => {
    switch (type) {
      case FunctionEnum.DIMENSION:
        setPickColumn([... pickColumn, ...dimensions])
        setDimensions([]);
        break;
      case FunctionEnum.MEASURE:
        setPickColumn([... pickColumn, ...measurements])
        setMeasurments([]);
        break;
    }
  }

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement> | undefined) =>{
    e?.preventDefault()
  }

  useEffect(() => {
    if(columns){
      setPickColumn([... columns])
    }
  },[columns])

  useEffect (() => {
    if(dimensions.length > 0 && measurements.length > 0) {
      setParams({
        dimension: dimensions[0].name,
        measures: measurements.map((val) => (val.name))
      })
    }
  }, [measurements, dimensions, setParams])

  const dimensionOnly = useMemo(() => {
    return columns?.filter((val) => val.function === FunctionEnum.DIMENSION ).map((val) => val.name)
  },[columns])

  const modifiedData = useMemo(() => {
    let qualitative: string[] = []
    let quantitative: DataPlotTypes[] = []

    data?.forEach((el) => {
      if(dimensionOnly?.includes(el.name)){
        qualitative = [...qualitative, ... el.values]
      }else{
        quantitative = [... quantitative, el]
      }
    })

    return {
      qualitative,
      quantitative
    }

  },[data, dimensionOnly])

  return (
    <div>
      <LoadingSpinner show={loadingData || isLoading} />
      <div className='layout'>
        <SnackBar message={error || dataError} onClose={() => { clearError(); clearErrorData() }} open={isError || isErrorData} />
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
        <div className='content_data'>
          <h1>Plotter</h1>
          <div>
            <span>Dimensions:</span>
            <DimensionBox 
              removeItem={handleRemoveDimensionItem} 
              elements={dimensions} 
              handleOnDrop={handleOnDropDimension} 
              handleOnDragOver={handleOnDragOver} 
              onReset={() => handleReset(FunctionEnum.DIMENSION)}
              handleOnDragStart={handleDragStart}
              limit={1}
            />
          </div>
          <div>
            <span>Measurments:</span>
            <DimensionBox 
              removeItem={handleRemoveMeasurementItem} 
              elements={measurements} 
              handleOnDrop={handleOnDropMeasurment} 
              handleOnDragOver={handleOnDragOver} 
              onReset={() => handleReset(FunctionEnum.MEASURE)}
              handleOnDragStart={handleDragStart} 
            />
          </div>
          { dimensions.length > 0 && measurements.length > 0 && 
            <LinearGraph  qualitative={modifiedData.qualitative} quantitative={modifiedData.quantitative} />
          }
        </div>
      </div>
    </div>
  )
}

export default App
