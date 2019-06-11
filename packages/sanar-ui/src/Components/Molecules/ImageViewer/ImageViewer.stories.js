import React from 'react'
import { storiesOf } from '@storybook/react'
import ESImageViewer from './ImageViewer'

storiesOf('Molecules.ImageViewer', module).add('Simple', () => (
    <ESImageViewer image='https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg' />
))
