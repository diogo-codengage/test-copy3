
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESQuestionListItem from '../'

it('renders correctly', () => {
    const component = (
        <ESQuestionListItem>
            <h1>ESQuestionListItem</h1>
        </ESQuestionListItem>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
