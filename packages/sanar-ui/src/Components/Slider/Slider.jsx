import React from 'react'
import { Slider } from 'antd'
import classNames from 'classnames'

const EsSlider = ({ className, ...props }) => {
  const classes = classNames(
    'es-slider',
    className
  )
  
  return (
    <Slider className={classes} {...props} />
  )
}

export default EsSlider
