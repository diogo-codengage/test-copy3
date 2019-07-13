
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCommentList from '../'

it('renders correctly', () => {
    const component = (
        <ESCommentList>
            <h1>ESCommentList</h1>
        </ESCommentList>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
