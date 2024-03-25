import React from 'react'
import './index.scss'

type ColumnBarProps = {
  title: string,
  key: string
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
}

const ColumnBar = ({key, title, onDragStart}:ColumnBarProps) => {
  return (
    <div className='container' key={key} draggable onDragStart={onDragStart}>
      {title}
    </div>
  )
}

export default ColumnBar