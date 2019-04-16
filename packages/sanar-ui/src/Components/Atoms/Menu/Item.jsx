import React from 'react'
import { Menu } from 'antd'
import classNames from 'classnames'

const Item = Menu.Item

const ESItem = ({ className, component, ...props }) => {
  const classes = classNames(
    'es-item',
    className
  )
  
  return (
    <Item className={classes} {...props} />
  )
}

export default ESItem
