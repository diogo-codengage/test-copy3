
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESFeedbackSimple from '../'

it('renders correctly', () => {
    const component = (
        <ESFeedbackSimple>
            <h1>ESFeedbackSimple</h1>
        </ESFeedbackSimple>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
