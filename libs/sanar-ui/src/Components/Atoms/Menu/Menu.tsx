import React from 'react'
import { Menu } from 'antd'
import classNames from 'classnames'

const ESDropdown: React.FC<any> = ({ className, component, ...props }) => {
  const classes = classNames(
    'es-menu',
    className
  )
  
  return (
    <Menu className={classes} {...props} />
  )
}

export default ESDropdown
