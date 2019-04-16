import React from 'react'
import Pagination from 'antd/lib/pagination'
import classNames from 'classnames'

const EsButton = ({ className, ...props }) => {
  const classes = classNames(
    'es-pagination',
    className
  )

  return (
    <Pagination  className={classes} {...props} />
  )
}

export default EsButton
