
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESPlaylist from '../'

it('renders correctly', () => {
    const component = (
        <ESPlaylist>
            <h1>ESPlaylist</h1>
        </ESPlaylist>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
