import React from 'react'
import './index.scss'
import { FunctionEnum } from '../../types/colmuns'

type ColumnBarProps = {
  title: string,
  type: FunctionEnum
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
}

const ColumnBar = ({type, title, onDragStart}:ColumnBarProps) => {
  return (
    <div className='container' id={type}  draggable onDragStart={onDragStart}>
      {title}
    </div>
  )
}

export default ColumnBar