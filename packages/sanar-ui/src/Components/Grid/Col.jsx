import React from 'react'
import { Col } from 'antd'
import classNames from 'classnames'

const EsCol = ({ className, ...props }) => {
  const classes = classNames(
    'es-Col',
    className
  )
  
  return (
    <Col className={classes} {...props} />
  )
}

export default EsCol
