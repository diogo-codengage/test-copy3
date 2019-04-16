import React from 'react'
import { Tabs  } from 'antd'
import classNames from 'classnames'

const TabPane = Tabs.TabPane

const EsTabPane = ({ className, ...props }) => {
  const classes = classNames(
    'es-tab-pane',
    className
  )
  
  return (
    <TabPane className={classes} {...props} />
  )
}

export default EsTabPane
