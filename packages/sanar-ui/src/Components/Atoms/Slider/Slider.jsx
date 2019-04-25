import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'antd/lib/slider'
import classNames from 'classnames'

const ESSlider = ({ className, ...props }) => {
    const classes = classNames('es-slider', className)

    return <Slider className={classes} {...props} />
}

ESSlider.propTypes = Object.assign(
    { ...Slider['propTypes'] },
    {
        range: PropTypes.bool,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        marks: PropTypes.object,
        dots: PropTypes.bool,
        value: PropTypes.number,
        defaultValue: PropTypes.number,
        included: PropTypes.bool,
        disabled: PropTypes.bool,
        vertical: PropTypes.bool,
        onChange: PropTypes.func,
        onAfterChange: PropTypes.func,
        tipFormatter: PropTypes.func,
        className: PropTypes.string,
        tooltipVisible: PropTypes.bool
    }
)

ESSlider.defaultProps = Slider['defaultProps']

export default ESSlider
