import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'antd/lib/slider'
import classNames from 'classnames'

type IProps = PropTypes.InferProps<typeof propTypes>
const ESSlider = ({ className, ...props }: IProps) => {
    const classes = classNames('es-slider', className)

    return <Slider className={classes} {...props} />
}

const propTypes =Object.assign(
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

ESSlider.propTypes = propTypes

ESSlider.defaultProps = Slider['defaultProps']

export default ESSlider
