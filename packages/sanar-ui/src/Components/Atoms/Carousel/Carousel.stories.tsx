import React, { CSSProperties } from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESCarousel from './Carousel'

const style: CSSProperties = {
    textAlign: 'center',
    background: '#364d79',
    height: '100px',
    lineHeight: '100px',
    color: '#fff'
}

storiesOf('Atoms.Carousel', module).add('Simple', () => (
    <ESCarousel
        dots={boolean('Dots', true)}
        vertical={boolean('Vertical', false)}
        autoplay={boolean('Autoplay', false)}
        arrows={boolean('Arrows', false)}
    >
        {[0, 1, 2, 3, 4, 6, 7].map((e, i) => (
            <div key={i}>
                <h2 style={style}>{i}</h2>
            </div>
        ))}
    </ESCarousel>
))
