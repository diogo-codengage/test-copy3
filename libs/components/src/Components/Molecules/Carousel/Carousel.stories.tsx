import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number } from '@storybook/addon-knobs'
import SANCarousel from './Carousel'

import styled from 'styled-components'

const Item = styled.h2`
    padding: 12px;
    margin: 12px;
    color: #ffff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
`

const renderItem = (_, i) => (
    <div key={i}>
        <Item>{i}</Item>
    </div>
)

storiesOf('Molecules.Carousel', module).add(
    'Simple',
    () => (
        <SANCarousel
            dots={boolean('Dots', false)}
            vertical={boolean('Vertical', false)}
            autoplay={boolean('Autoplay', false)}
            arrows={boolean('Arrows', true)}
            draggable={boolean('Draggable', true)}
            infinite={boolean('Infinite', true)}
            slidesToShow={number('SlidesToShow', 2)}
            slidesToScroll={number('SlidesToScroll', 2)}
        >
            {[0, 1, 2, 3, 4, 6, 7].map(renderItem)}
        </SANCarousel>
    ),
    {
        style: {
            padding: '20px 90px'
        }
    }
)
