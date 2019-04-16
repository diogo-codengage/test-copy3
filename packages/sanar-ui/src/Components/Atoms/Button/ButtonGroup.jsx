import React from 'react'
import { Button } from 'antd'
import classNames from 'classnames'

const ButtonGroup = Button.Group

const ESButtonGroup = ({ className, clear, ...props }) => {
  const classes = classNames(
    'es-button-group',
    className
  )
  
  return (
    <ButtonGroup className={classes} {...props} />
  )
}

export default ESButtonGroup
