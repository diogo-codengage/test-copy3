import React from 'react'
import { storiesOf } from '@storybook/react'
import ESQuestionListItem from './QuestionListItem'
import { text, boolean } from '@storybook/addon-knobs'

storiesOf('Molecules.QuestionListItem', module).add('Simple', () => (
    <ESQuestionListItem
        loading={boolean('Loading', false)}
        avatar={text(
            'Avatar',
            'https://freeiconshop.com/wp-content/uploads/edd/person-girl-flat.png'
        )}
        title={text(
            'Title',
            'Orci consectetur metus Nulla est justo Vivamus nec orci pur'
        )}
        author={text('Author', 'Eliza Reid')}
        userIsAuthor={boolean('User is author', false)}
        badgeInfo={text('Badge', 'You')}
        interactionTime={text('Interaction time', 'Há 2 horas')}
        responses={text('Responses', 0)}
    />
))
