import React from 'react'
import { storiesOf } from '@storybook/react'
import ESCommentList from './CommentList'

const comment = {
    user: {
        name: 'San Holo'
    },
    text: `We supply a series of design principles, practical patterns and high quality design
    resources (Sketch and Axure), to help people create their product prototypes beautifully
    and efficiently.`,
    time: '2019-07-07T08:40:51.620Z'
}

const subComment = {
    user: {
        name: 'Diogo Biz'
    },
    text: `Mussum Ipsum, cacilds vidis litro abertis. Paisis, filhis, espiritis santis. Quem manda na minha terra sou euzis!`,
    time: '2019-07-07T08:40:51.620Z',
    parentId: 1
}

const comments = [
    {
        ...comment,
        answersCount: 4,
        likes_count: 78,
        dislikes_count: 0,
        user: {
            name: 'San Holo'
        }
    },
    {
        ...comment,
        answersCount: 2,
        likes_count: 5,
        dislikes_count: 0,
        user: {
            name: 'Arnold Schwarzenegger'
        },
        answers: [subComment, subComment]
    },
    {
        ...comment,
        answersCount: 0,
        likes_count: 1,
        dislikes_count: 6,
        user: {
            name: 'Francisco Everardo Oliveira Silva'
        }
    }
]

storiesOf('Organisms.CommentList', module).add(
    'Simple',
    () => <ESCommentList comments={comments} />,
    {
        style: {
            padding: 20,
            backgroundColor: '#242938'
        }
    }
)
