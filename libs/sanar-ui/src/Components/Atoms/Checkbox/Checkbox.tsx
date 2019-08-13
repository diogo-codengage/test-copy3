import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'antd/lib/checkbox'
import classNames from 'classnames'

const ESCheckbox: React.FC<IProps & any>=({ className, ...props }) => {
    const classes = classNames('es-checkbox', className)

    return <Checkbox className={classes} {...props} />
}

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    {...Checkbox['prototype']},
    {
        className: PropTypes.string,
        autoFocus: PropTypes.bool,
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        indeterminate: PropTypes.bool,
        onChange: PropTypes.func
    }
)
ESCheckbox.propTypes = propTypes

ESCheckbox.defaultProps = Checkbox['defaultProps']

export default ESCheckbox
