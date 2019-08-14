import React from 'react'
import PropTypes from 'prop-types'
import Input from 'antd/lib/input'
import classNames from 'classnames'

const TextArea = Input.TextArea

const ESTextArea = ({ className, ...props }) => {
    const classes = classNames('es-text-area', className)

    return <TextArea className={classes} {...props} />
}

ESTextArea.propTypes = Object.assign(
    { ...TextArea['propTypes'] },
    {
        className: PropTypes.string,
        autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        onPressEnter: PropTypes.func
    }
)

ESTextArea.defaultProps = TextArea['defaultProps']

export default ESTextArea
