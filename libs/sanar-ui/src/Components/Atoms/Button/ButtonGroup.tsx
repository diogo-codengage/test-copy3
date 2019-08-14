import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import classNames from 'classnames'

const ButtonGroup = Button.Group

const ESButtonGroup: React.FC<any> = ({ className, ...props }) => {
    const classes = classNames('es-button-group', className)

    return <ButtonGroup className={classes} {...props} />
}

ESButtonGroup.propTypes = {
    className: PropTypes.string
}

export default ESButtonGroup
