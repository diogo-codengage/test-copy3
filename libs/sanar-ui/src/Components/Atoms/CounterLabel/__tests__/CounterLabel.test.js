
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCounterLabel from '../'

it('renders correctly', () => {
    const component = (
        <ESCounterLabel>
            <h1>ESCounterLabel</h1>
        </ESCounterLabel>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
