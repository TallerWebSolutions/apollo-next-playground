import React from 'react'

const style = {
  fontSize: '2em',
  cursor: 'pointer',
  marginLeft: '.5em',
}

const Favorite = ({ onClick, isMarked }) => (
  <span style={style} onClick={onClick}>
    {isMarked ? '★' : '☆'}
  </span>
)

export default Favorite
