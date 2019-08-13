
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCardInfo from '../'

it('renders correctly', () => {
    const component = (
        <ESCardInfo>
            <h1>ESCardInfo</h1>
        </ESCardInfo>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
