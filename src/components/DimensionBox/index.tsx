import React from 'react'
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

/**
 * 
 * @param {number} limit - The maximum number of items to add in the DimensionBox.
 * @param {Function} removeItem - This function is used to remove specefic item or column of type {ColumnsProps} from the the picked list.
 * @param {Function} onReset - This method is used to clear all picked items in the list.
 * @param {Function} handleOnDrop - This Function is used to handle the drop callback from a draggable Item and place it in the DimensionBox Component.                                                       
 * @param {ColumnsProps[]} elements - The array in which that contains the properties for DimensionBox Component.
 */

const DimensionBox = ({elements, onReset, handleOnDrop, removeItem, limit = 10}:DimensionBoxProps) => {
  
  const handleCallBack = () => {
    return false
  }

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