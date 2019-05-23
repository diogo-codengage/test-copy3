
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESQuestionList from '../'

it('renders correctly', () => {
    const component = (
        <ESQuestionList>
            <h1>ESQuestionList</h1>
        </ESQuestionList>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
