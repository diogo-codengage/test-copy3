
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESProgress from '../'

it('renders correctly', () => {
    const component = (
        <ESProgress>
            <h1>ESProgress</h1>
        </ESProgress>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
