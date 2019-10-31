import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, boolean } from '@storybook/addon-knobs'
import SANProgress from './Progress'

storiesOf('Atoms.Progress', module).add(
    'Simple',
    () => (
        <SANProgress
            percent={number('Percent', 50)}
            showInfo={boolean('Show info', true)}
            color='secondary'
        />
    ),
    {
        style: {
            background: '#7b7b7b'
        }
    }
)
