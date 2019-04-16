import React from 'react'
import { Dropdown } from 'antd'
import classNames from 'classnames'

const EsDropdown = ({ className, component, ...props }) => {
  const classes = classNames(
    'es-dropdown',
    className
  )
  
  return (
    <Dropdown className={classes} {...props} />
  )
}

export default EsDropdown
