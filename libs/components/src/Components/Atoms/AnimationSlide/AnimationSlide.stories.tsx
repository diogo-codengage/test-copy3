import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select } from '@storybook/addon-knobs'

import { SANBox } from '../Box'
import SANAnimationSlide, { AnimationSlideDirections } from './AnimationSlide'

storiesOf('Atoms.AnimationSlide', module).add('Simple', () => (
    <SANAnimationSlide
        direction={select(
            'direction',
            Object.keys(AnimationSlideDirections),
            'leftToRight'
        )}
        timeout={300}
        in={boolean('show', false)}
        appear
        onEnter={console.log}
        onEntering={console.log}
        onEntered={console.log}
        onExit={console.log}
        onExiting={console.log}
        onExited={console.log}
    >
        <SANBox bg='secondary' color='white' p={10}>
            Slide
        </SANBox>
    </SANAnimationSlide>
))
