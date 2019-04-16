import React from 'react'
import { Checkbox  } from 'antd'
import classNames from 'classnames'

const ESButton = ({ className, ...props }) => {
  const classes = classNames(
    'es-checkbox',
    className
  )

  return (
    <Checkbox className={classes} {...props} />
  )
}

export default ESButton
