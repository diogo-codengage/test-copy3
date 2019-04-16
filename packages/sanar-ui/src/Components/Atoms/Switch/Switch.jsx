import React from 'react'
import { Switch } from 'antd'
import classNames from 'classnames'

import ESIcon from '../Icon'

const ESSwitch = ({ className, checkedChildren, ...props }) => {
  const classes = classNames(
    'es-switch',
    className
  )

  const icon = checkedChildren ? checkedChildren : <ESIcon type="check" />
  
  return (
    <Switch
      checkedChildren={icon}
      className={classes}
      {...props} 
    />
  )
}

export default ESSwitch
