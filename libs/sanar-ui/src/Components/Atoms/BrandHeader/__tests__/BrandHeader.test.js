import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESBrandHeader from '..'

it('renders correctly', () => {
    const component = (
        <ESBrandHeader>
            <h1>ESBrandHeader</h1>
        </ESBrandHeader>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
