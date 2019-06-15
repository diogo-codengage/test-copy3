
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESJwPlayer from '../'

it('renders correctly', () => {
    const component = (
        <ESJwPlayer>
            <h1>ESJwPlayer</h1>
        </ESJwPlayer>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
