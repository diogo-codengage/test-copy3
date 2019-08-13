
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESStopwatch from '../'

it('renders correctly', () => {
    const component = (
        <ESStopwatch>
            <h1>ESStopwatch</h1>
        </ESStopwatch>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
