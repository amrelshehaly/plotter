import React, { useCallback } from 'react'
import './index.scss'
import { ColumnsProps } from '../../types/colmuns'
import closeIcon from '../../assets/close-x.svg'

type DimensionBoxProps = {
    elements : ColumnsProps[]
    onReset: () => void
    handleOnDrop: (e: React.DragEvent<HTMLDivElement>) => void
    removeItem: (el: ColumnsProps) => void
    limit?: number
}

const DimensionBox = ({elements, onReset, handleOnDrop, removeItem, limit = 10}:DimensionBoxProps) => {
  
  const handleCallBack = useCallback(() => {
    return false
  },[]) 

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) =>{
    e?.preventDefault()
  }

  return (
    <div className='Dimension_Container'>
        <div className='elements' onDrop={limit && limit <= elements.length? handleCallBack : handleOnDrop} onDragOver={handleOnDragOver}>
            {
                elements.map((val, idx) => (
                    <div key={idx} className='selectedBox'>
                        <div>
                            {val.name}
                        </div>
                        <div onClick={() => removeItem(val)}>
                            <img src={closeIcon} alt='close-icon' />
                        </div>
                    </div>
                ))
            }
        </div>
        <div className='resetBtn'>
            <button onClick={onReset} type='button'>
                reset
            </button>
        </div>
    </div>
  )
}

export default DimensionBox