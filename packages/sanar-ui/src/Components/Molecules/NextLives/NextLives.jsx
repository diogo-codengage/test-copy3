import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import ESCarousel from '../../Atoms/Carousel'

const responsive = [
    {
        breakpoint: 1920,
        settings: {
            slidesToShow: 5
        }
    },
    {
        breakpoint: 1560,
        settings: {
            slidesToShow: 4
        }
    },
    {
        breakpoint: 1280,
        settings: {
            slidesToShow: 3
        }
    },
    {
        breakpoint: 960,
        settings: {
            slidesToShow: 2
        }
    },
    {
        breakpoint: 700,
        settings: {
            slidesToShow: 1,
            arrows: false
        }
    }
]

const ESNextLives = ({ className, children, responsive, ...props }) => {
    const ref = useRef(null)
    const [arrows, setArrows] = useState(true)

    const onReInit = () => {
        if (ref.current) {
            ref.current.slick.state.breakpoint === 700
                ? setArrows(false)
                : setArrows(true)
        }
    }

    return (
        <ESCarousel
            {...props}
            ref={ref}
            slidesToScroll={1}
            slidesToShow={5}
            infinite={false}
            dots={false}
            arrows={arrows}
            speed={3000}
            responsive={responsive}
            draggable
            onReInit={onReInit}
        >
            {children}
        </ESCarousel>
    )
}

ESNextLives.propTypes = Object.assign(
    { ...ESCarousel['propTypes'] },
    {
        children: PropTypes.node,
        responsive: PropTypes.array,
        test: PropTypes.instanceOf(ESCarousel)
    }
)
ESNextLives.defaultProps = {
    responsive
}

export default ESNextLives
