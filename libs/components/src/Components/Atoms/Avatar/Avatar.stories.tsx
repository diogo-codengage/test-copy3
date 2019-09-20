import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, number } from '@storybook/addon-knobs'
import SANAvatar from './Avatar'

storiesOf('Atoms.Avatar', module).add('Simple', () => (
    <SANAvatar
        src={text(
            'Src',
            'https://cdn-images-1.medium.com/fit/c/200/200/0*XlT1iL_rE4s6_sa2.jpg'
        )}
        alt='Picture'
        size={number('Size', 100)}
        borderRadius={number('Border radius', 50)}
    />
))
