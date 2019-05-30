
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCollapse from '../'

it('renders correctly', () => {
    const component = (
        <ESCollapse>
            <h1>ESCollapse</h1>
        </ESCollapse>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
