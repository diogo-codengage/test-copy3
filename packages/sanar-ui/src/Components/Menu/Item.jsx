import React from 'react'
import { Menu } from 'antd'
import classNames from 'classnames'

const Item = Menu.Item

const EsItem = ({ className, component, ...props }) => {
  const classes = classNames(
    'es-item',
    className
  )
  
  return (
    <Item className={classes} {...props} />
  )
}

export default EsItem
