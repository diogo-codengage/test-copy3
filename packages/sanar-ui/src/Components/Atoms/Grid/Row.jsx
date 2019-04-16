import React from 'react'
import { Row } from 'antd'
import classNames from 'classnames'

const EsRow = ({ className, ...props }) => {
  const classes = classNames(
    'es-row',
    className
  )
  
  return (
    <Row className={classes} {...props} />
  )
}

export default EsRow
