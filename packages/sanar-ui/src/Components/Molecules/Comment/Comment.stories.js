import React from 'react'
import ESComment from './Comment'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

const comment = {
    author: {
        name: 'San Holo',
        avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    },
    content: `We supply a series of design principles, practical patterns and high quality design
    resources (Sketch and Axure), to help people create their product prototypes beautifully
    and efficiently.`,
    time: '24 dias'
}

storiesOf('Molecules.Comment', module).add('Comment', () => (
    <ESComment
        author={comment.author}
        content={comment.content}
        time={comment.time}
        monitor={boolean('Monitor', true)}
    />
))
