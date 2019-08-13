
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESMissContent from '../'

it('renders correctly', () => {
    const component = (
        <ESMissContent>
            <h1>ESMissContent</h1>
        </ESMissContent>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
