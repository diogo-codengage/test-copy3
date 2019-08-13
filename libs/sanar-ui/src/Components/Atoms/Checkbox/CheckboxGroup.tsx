import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'antd/lib/checkbox'
import classNames from 'classnames'

const ESCheckboxGroup: React.FC<IProps> = ({ className, ...props }, ref) => {
    const classes = classNames('es-checkbox-group', className)

    return <Checkbox.Group ref={ref} className={classes} {...props} />
}

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    { ...Checkbox['prototype'] },
    {
        className: PropTypes.string,
        name: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        value: PropTypes.array,
        defaultValue: PropTypes.array,
        options: PropTypes.array
    }
)

ESCheckboxGroup.propTypes = propTypes

ESCheckboxGroup.defaultProps = Checkbox['defaultProps'] as ESCheckboxGroup

export default forwardRef(ESCheckboxGroup)
