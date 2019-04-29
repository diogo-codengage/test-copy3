import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Carousel } from 'antd'

import ESButton from '../Button'
import ESEvaIcon from '../EvaIcon'

const ESCarousel = ({ className, style, ...props }) => {
    const carouselRef = useRef()
    const classes = classNames('es-carousel', className)

    const styles = {
        ...style,
        ...(props.arrows && { width: 'calc(100% - 150px)' })
    }

    const next = () => carouselRef.current.next()

    const prev = () => carouselRef.current.prev()

    return (
        <div style={styles} className={classes}>
            <Carousel
                ref={carouselRef}
                {...props}
                nextArrow={
                    <ESButton onClick={next} shape='circle'>
                        <ESEvaIcon name='arrow-ios-forward-outline' />
                    </ESButton>
                }
                prevArrow={
                    <ESButton onClick={prev} shape='circle'>
                        <ESEvaIcon name='arrow-ios-back-outline' />
                    </ESButton>
                }
            />
        </div>
    )
}

ESCarousel.propTypes = Object.assign(
    { ...Carousel['propTypes'] },
    {
        className: PropTypes.string,
        autoplay: PropTypes.bool,
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
        dots: PropTypes.bool,
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

ESCarousel.defaultProps = Carousel['defaultProps']

export default ESCarousel
