import React from 'react'
import { Tabs  } from 'antd'
import classNames from 'classnames'

const ESTabs = ({ className, ...props }) => {
  const classes = classNames(
    'es-tabs',
    className
  )
  
  return (
    <Tabs className={classes} {...props} />
  )
}

export default ESTabs
