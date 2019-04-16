import React from 'react'
import { Dropdown } from 'antd'
import classNames from 'classnames'

const ESDropdown = ({ className, component, ...props }) => {
  const classes = classNames(
    'es-dropdown',
    className
  )
  
  return (
    <Dropdown className={classes} {...props} />
  )
}

export default ESDropdown
