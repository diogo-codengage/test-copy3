import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Select } from 'antd'

const Option = Select.Option

const ESOption: React.FC<any> = ({ className }) => {
    const classes = classNames('es-select-option', className)
    return <Option className={classes} />
}

ESOption.propTypes = Object.assign(
    {
        ...Option['propTypes']
    },
    {
        className: PropTypes.string
    }
)
ESOption.defaultProps = {}

export default ESOption
