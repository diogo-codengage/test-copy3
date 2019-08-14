import React from 'react'
import { storiesOf } from '@storybook/react'
import ESImageViewer from './ImageViewer'

const images = {
    small: {
        width: 665,
        height: 429,
        url:
            'https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg'
    },
    medium: {
        width: 665,
        height: 429,
        url:
            'https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg'
    },
    large: {
        width: 665,
        height: 429,
        url:
            'https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg'
    }
}

storiesOf('Molecules.ImageViewer', module).add('Simple', () => (
    <ESImageViewer images={images} />
))
