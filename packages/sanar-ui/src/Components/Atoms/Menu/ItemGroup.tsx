import React from 'react'
import { Menu } from 'antd'
import classNames from 'classnames'

const ItemGroup = Menu.ItemGroup

const ESItemGroup: React.FC<any> = ({ className, ...props }) => {
  const classes = classNames(
    'es-item-group',
    className
  )
  
  return (
    <ItemGroup className={classes} {...props} />
  )
}

export default ESItemGroup
