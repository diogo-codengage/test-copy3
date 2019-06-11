import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESAuthTemplate from '../'

it('renders correctly', () => {
    const component = (
        <ESAuthTemplate>
            <h1>ESAuthTemplate</h1>
        </ESAuthTemplate>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
