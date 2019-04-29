import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'

import ESCard from '../Card'
import ESCarousel from '../../Atoms/Carousel'

const { Title, Text } = Typography

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
            slidesToShow: 1
        }
    }
]

const ESNextLives = ({ className, children, responsive, ...props }) => (
    <ESCarousel
        {...props}
        slidesToScroll={1}
        slidesToShow={5}
        infinite={false}
        dots={false}
        arrows={true}
        responsive={responsive}
    >
        {children}
    </ESCarousel>
)

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
