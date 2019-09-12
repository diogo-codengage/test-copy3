import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, boolean, text } from '@storybook/addon-knobs'

import SANList from './List'
import SANDefaultListItem from './DefaulItem'
import SANListItem from './Item'

const typeOptions = {
    Video: 'video',
    Mentalmap: 'mentalmap',
    Flowchart: 'flowchart',
    Article: 'article',
    Lesson: 'lesson',
    Question: 'question',
    Resume: 'resume'
}

storiesOf('Atoms.List', module)
    .add('Simple', () => (
        <SANList
            dataSource={[{}, {}]}
            renderItem={(item, index) => (
                <SANListItem>Item {index} </SANListItem>
            )}
        />
    ))
    .add('Default Item', () => (
        <SANList>
            <SANDefaultListItem
                title={text('Title', 'Lorem ipsum dolor sit amet.')}
                type={select('Type', typeOptions)}
                hasIcon={boolean('Has icon', true)}
            />
        </SANList>
    ))
