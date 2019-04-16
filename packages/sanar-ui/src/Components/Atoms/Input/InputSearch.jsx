import React from 'react'
import { Input } from 'antd'
import classNames from 'classnames'

const Search = Input.Search

const ESInputSearch = ({ className, ...props }) => {
  const classes = classNames(
    'es-input-search',
    className
  )
  
  return (
    <Search className={classes} {...props} />
  )
}

export default ESInputSearch
