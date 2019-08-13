
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESFeedbackUpload from '../'

it('renders correctly', () => {
    const component = (
        <ESFeedbackUpload>
            <h1>ESFeedbackUpload</h1>
        </ESFeedbackUpload>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
