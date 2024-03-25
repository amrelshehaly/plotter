import React from 'react'
import './index.scss'
import { ColumnsProps } from '../../types/colmuns'
import closeIcon from '../../assets/close-x.svg'

type DimensionBoxProps = {
    elements : ColumnsProps[]
    onReset: () => void
    handleOnDrop: (e: React.DragEvent<HTMLDivElement>) => void
    handleOnDragOver: (e: React.DragEvent<HTMLDivElement>) => void
    removeItem: (el: ColumnsProps) => void
}

const DimensionBox = ({elements, onReset, handleOnDragOver, handleOnDrop, removeItem}:DimensionBoxProps) => {
  return (
    <div className='Dimension_Container'>
        <div className='elements' onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
            {
                elements.map((val) => (
                    <div className='selectedBox'>
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
        <div>
            <button onClick={onReset} type='button'>
                reset
            </button>
        </div>
    </div>
  )
}

export default DimensionBox