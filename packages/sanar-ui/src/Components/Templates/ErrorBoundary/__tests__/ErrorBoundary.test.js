
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESErrorBoundary from '../'

it('renders correctly', () => {
    const component = (
        <ESErrorBoundary>
            <h1>ESErrorBoundary</h1>
        </ESErrorBoundary>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
