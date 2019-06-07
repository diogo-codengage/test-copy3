
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESPdfReader from '../'

it('renders correctly', () => {
    const component = (
        <ESPdfReader>
            <h1>ESPdfReader</h1>
        </ESPdfReader>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
