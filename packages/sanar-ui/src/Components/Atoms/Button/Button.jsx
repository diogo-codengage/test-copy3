import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import classNames from 'classnames'

const ESButton = ({ className, clear, fontSize, style, ...props }) => {
    const classes = classNames('es-button', className, {
        'es-button__clear': clear
    })

    const styles = {
        ...style,
        ...(fontSize && { fontSize })
    }

    return <Button style={styles} className={classes} {...props} />
}

ESButton.propTypes = Object.assign(
    { ...Button['propTypes'] },
    {
        clear: PropTypes.bool,
        href: PropTypes.string,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        target: PropTypes.string
    }
)

ESButton.defaultProps = Button['defaultProps']

export default ESButton
