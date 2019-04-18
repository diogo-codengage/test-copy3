import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import classNames from 'classnames'

const ESButton = ({ className, clear, ...props }) => {
    const classes = classNames('es-button', className, {
        'es-button__clear': clear
    })

    return <Button className={classes} {...props} />
}

ESButton.propTypes = Object.assign(
    { ...Button['propTypes'] },
    {
        clear: PropTypes.bool
    }
)

ESButton.defaultProps = Button['defaultProps']

export default ESButton
