import React from 'react'
import './index.scss'
import { ColumnsProps } from '../../types/colmuns'

type ColumnBarProps = {
  format: string
  data: ColumnsProps
}

const ColumnBar = ({format, data}:ColumnBarProps) => {

  const  handleDragStart = (e : React.DragEvent<HTMLDivElement>) => {
    e?.dataTransfer.setData(format, JSON.stringify(data))
  }

  return (
    <div className='container' draggable onDragStart={handleDragStart}>
      {data.name}
    </div>
  )
}

export default ColumnBar