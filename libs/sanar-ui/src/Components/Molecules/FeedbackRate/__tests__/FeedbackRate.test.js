
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESFeedbackRate from '../'

it('renders correctly', () => {
    const component = (
        <ESFeedbackRate>
            <h1>ESFeedbackRate</h1>
        </ESFeedbackRate>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
