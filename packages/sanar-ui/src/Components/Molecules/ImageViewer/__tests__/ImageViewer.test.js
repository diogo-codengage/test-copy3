
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESImageViewer from '../'

it('renders correctly', () => {
    const component = (
        <ESImageViewer>
            <h1>ESImageViewer</h1>
        </ESImageViewer>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
