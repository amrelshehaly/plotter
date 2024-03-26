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

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, type: FunctionEnum) => {
    const columnVal: ColumnsProps = JSON.parse(e.dataTransfer.getData("columnsType"));
    if(columnVal.function != type) return;
    const findElement = columns?.find((val) => val.name === columnVal.name);
    if(!findElement) return
    const filteredColumns = pickColumn.filter((val) => val !== findElement);
    switch (type) {
      case FunctionEnum.DIMENSION:
        setDimensions([... dimensions, findElement]);
        setPickColumn([... filteredColumns]);
        break;
      case FunctionEnum.MEASURE:
        setMeasurments([... measurements, findElement])
        setPickColumn([... filteredColumns])
      break;
    
    }
  }

  const handleRemoveItem = (el: ColumnsProps, type: FunctionEnum) => {
    switch (type) {
      case FunctionEnum.DIMENSION:
        { const filteredItem = dimensions.filter((val) => val !== el)
          setDimensions([... filteredItem])
          setPickColumn([... pickColumn, el])
        }
        break;
    
      case FunctionEnum.MEASURE:
        {
          const filteredItem =measurements.filter((val) => val !== el)
          setMeasurments([ ... filteredItem ])
          setPickColumn([... pickColumn, el])
        }
      break;
    }
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
                <ColumnBar key={idx} data={val} format='columnsType'  />
              </>
            ))
          }
        </div>
        <div className='content_data'>
          <h1>Plotter</h1>
          <div>
            <span>Dimensions:</span>
            <DimensionBox 
              removeItem={(e) => handleRemoveItem(e, FunctionEnum.DIMENSION)} 
              elements={dimensions} 
              handleOnDrop={(e) => handleOnDrop(e, FunctionEnum.DIMENSION)} 
              onReset={() => handleReset(FunctionEnum.DIMENSION)}
              limit={1}
            />
          </div>
          <div>
            <span>Measurments:</span>
            <DimensionBox 
              removeItem={(e) => handleRemoveItem(e, FunctionEnum.MEASURE)} 
              elements={measurements} 
              handleOnDrop={(e) => handleOnDrop(e, FunctionEnum.MEASURE)} 
              onReset={() => handleReset(FunctionEnum.MEASURE)}
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
