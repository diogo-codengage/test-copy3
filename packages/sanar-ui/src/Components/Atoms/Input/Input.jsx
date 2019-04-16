import React from 'react'
import { Input } from 'antd'
import classNames from 'classnames'

const ESButton = ({ className, component, ...props }) => {
  const classes = classNames(
    'es-input',
    className
  )
  
  const Comp = component ? component : Input

  return (
    <Comp className={classes} {...props} />
  )
}

export default ESButton
