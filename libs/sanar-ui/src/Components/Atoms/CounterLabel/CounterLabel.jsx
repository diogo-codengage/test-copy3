import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'

const ESCounterLabel = ({ counter, label, fontSize }) => (
    <Typography.Text style={{ fontSize: fontSize }}>
        <Typography.Text strong>{counter}</Typography.Text>
        {` ${label}${counter != 1 ? 's' : ''}`}
    </Typography.Text>
)

ESCounterLabel.propTypes = {
    counter: PropTypes.number,
    label: PropTypes.string,
    fontSize: PropTypes.number
}
ESCounterLabel.defaultProps = {
    fontSize: 12
}

export default ESCounterLabel
