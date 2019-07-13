import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ESTextEditor from './TextEditor'

storiesOf('Molecules.TextEditor', module)
    .add('Ask', () => (
        <ESTextEditor
            onCancel={action('onCancel')}
            onSubmit={action('onSubmit')}
        />
    ))
    .add('Comment', () => (
        <ESTextEditor
            comment
            onCancel={action('onCancel')}
            onSubmit={action('onSubmit')}
        />
    ))
    .add(
        'Ask dark',
        () => (
            <ESTextEditor
                dark
                onCancel={action('onCancel')}
                onSubmit={action('onSubmit')}
            />
        ),
        {
            style: {
                padding: 20,
                backgroundColor: '#242938'
            }
        }
    )
    .add(
        'Comment dark',
        () => (
            <ESTextEditor
                dark
                avatar='https://cdn-images-1.medium.com/fit/c/200/200/0*XlT1iL_rE4s6_sa2.jpg'
                comment
                onCancel={action('onCancel')}
                onSubmit={action('onSubmit')}
            />
        ),
        {
            style: {
                padding: 20,
                backgroundColor: '#242938'
            }
        }
    )
