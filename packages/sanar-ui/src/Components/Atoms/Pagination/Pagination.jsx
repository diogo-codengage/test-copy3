import React from 'react'
import Pagination from 'antd/lib/pagination'
import classNames from 'classnames'

const ESButton = ({ className, ...props }) => {
  const classes = classNames(
    'es-pagination',
    className
  )

  return (
    <Pagination  className={classes} {...props} />
  )
}

export default ESButton
