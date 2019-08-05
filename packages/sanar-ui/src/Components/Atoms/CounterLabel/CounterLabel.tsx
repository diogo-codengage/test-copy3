import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'

const ESCounterLabel: React.FC<IProps>=({ counter, label, fontSize }) => (
    <Typography.Text style={{ fontSize: fontSize }}>
        <Typography.Text strong>{counter}</Typography.Text>
        {` ${label}${counter != 1 ? 's' : ''}`}
    </Typography.Text>
)

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign({
    counter: PropTypes.number,
    label: PropTypes.string,
    fontSize: PropTypes.number
})

ESCounterLabel.propTypes = propTypes

ESCounterLabel.defaultProps = {
    fontSize: 12
}

export default ESCounterLabel
