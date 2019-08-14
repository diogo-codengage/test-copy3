
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESFeedback from '../'

it('renders correctly', () => {
    const component = (
        <ESFeedback>
            <h1>ESFeedback</h1>
        </ESFeedback>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
