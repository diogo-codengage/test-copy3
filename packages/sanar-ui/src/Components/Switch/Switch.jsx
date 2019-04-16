import React from 'react'
import { Switch } from 'antd'
import classNames from 'classnames'

import EsIcon from '../Icon'

const EsSwitch = ({ className, checkedChildren, ...props }) => {
  const classes = classNames(
    'es-switch',
    className
  )

  const icon = checkedChildren ? checkedChildren : <EsIcon type="check" />
  
  return (
    <Switch
      checkedChildren={icon}
      className={classes}
      {...props} 
    />
  )
}

export default EsSwitch
