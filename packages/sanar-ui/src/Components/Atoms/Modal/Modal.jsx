import React from 'react'
import { Modal } from 'antd'
import classNames from 'classnames'

const EsModal = ({ className, ...props }) => {
  const classes = classNames(
    'es-modal',
    className
  )

  return (
    <Modal  className={classes} {...props} />
  )
}

export default EsModal
