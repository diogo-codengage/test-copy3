import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Carousel } from 'antd'

import ESButton from '../Button'
import ESEvaIcon from '../EvaIcon'

const NextArrow: React.FC<any> = ({ onClick, className }) => (
    <ESButton onClick={onClick} circle size='small' className={className}>
        <ESEvaIcon name='arrow-ios-forward-outline' />
    </ESButton>
)
const PrevArrow: React.FC<any> = ({ onClick, className }) => (
    <ESButton onClick={onClick} circle size='small' className={className}>
        <ESEvaIcon name='arrow-ios-back-outline' />
    </ESButton>
)

const ESCarousel: React.FC<IProps & any> = (({ className, style, ...props }, ref) => {
    const classes = classNames('es-carousel', className)

    const next = () => ref.current.next()

    const prev = () => ref.current.prev()

    return (
        <div style={style} className={classes}>
            <Carousel
                ref={ref}
                {...props}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
            />
        </div>
    )
})

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    { ...Carousel['propTypes'] },
    {
        className: PropTypes.string,
        autoplay: PropTypes.bool,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'default']),
        afterChange: PropTypes.func,
        beforeChange: PropTypes.func,
        dots: PropTypes.bool,
        easing: PropTypes.string,
        effect: PropTypes.any,
        vertical: PropTypes.bool,
        accessibility: PropTypes.bool,
        adaptiveHeight: PropTypes.bool,
        appendDots: PropTypes.func,
        arrows: PropTypes.bool,
        autoplaySpeed: PropTypes.bool,
        centerMode: PropTypes.bool,
        centerPadding: PropTypes.bool,
        customPaging: PropTypes.func,
        draggable: PropTypes.bool,
        focusOnSelect: PropTypes.bool,
        infinite: PropTypes.bool,
        initialSlide: PropTypes.number,
        nextArrow: PropTypes.node,
        pauseOnDotsHover: PropTypes.bool,
        pauseOnFocus: PropTypes.bool,
        pauseOnHover: PropTypes.bool,
        prevArrow: PropTypes.node,
        rows: PropTypes.number,
        rtl: PropTypes.bool,
        slide: PropTypes.string,
        slidesPerRow: PropTypes.number,
        slidesToScroll: PropTypes.number,
        slidesToShow: PropTypes.number,
        speed: PropTypes.number,
        touchThreshold: PropTypes.number,
        variableWidth: PropTypes.bool
    }
)

ESCarousel.prototype = propTypes

ESCarousel.defaultProps = Carousel['defaultProps']

export default forwardRef(ESCarousel)
