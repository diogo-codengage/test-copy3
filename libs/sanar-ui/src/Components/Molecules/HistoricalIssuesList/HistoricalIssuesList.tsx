import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const ESHistoricalIssuesList = ({ className, ...props }) => {
    const classes = classNames('es-historical-issues-list', className)
    return <div className={classes} {...props} />
}

ESHistoricalIssuesList.propTypes = {
    className: PropTypes.string
}
ESHistoricalIssuesList.defaultProps = {}

export default ESHistoricalIssuesList
