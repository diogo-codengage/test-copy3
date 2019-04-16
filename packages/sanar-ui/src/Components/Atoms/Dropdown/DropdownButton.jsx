import React from 'react'
import { Dropdown } from 'antd'
import classNames from 'classnames'

const DropdownButton = Dropdown.Button

const ESDropdownButton = ({ className, ...props }) => {
  const classes = classNames(
    'es-dropdown-button',
    className
  )
  
  return (
    <DropdownButton className={classes} {...props} />
  )
}

export default ESDropdownButton
