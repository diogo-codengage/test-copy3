import React from 'react'
import { Icon } from 'antd'
import classNames from 'classnames'

const ESIcon = ({ className, fontSize, style, color, ...props }) => {
  const classes = classNames(
    'es-icon',
    className,
    {
      [`text-${color}`]: color
    }
  )
  
  return (
    <Icon className={classes} {...props} style={{ ...style, fontSize }} />
  )
}

export default ESIcon
