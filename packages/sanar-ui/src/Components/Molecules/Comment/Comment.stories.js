import React from 'react'
import ESComment from './Comment'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

const comment = {
    user: {
        name: 'San Holo',
        profile_picture:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    },
    text: `We supply a series of design principles, practical patterns and high quality design
    resources (Sketch and Axure), to help people create their product prototypes beautifully
    and efficiently.`,
    time: '2019-07-07T08:40:51.620Z'
}

storiesOf('Molecules.Comment', module).add('Comment', () => (
    <ESComment
        user={comment.user}
        text={comment.text}
        time={comment.time}
        monitor={boolean('Monitor', true)}
    />
))
