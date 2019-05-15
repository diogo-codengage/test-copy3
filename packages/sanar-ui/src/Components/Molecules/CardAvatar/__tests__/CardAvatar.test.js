
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCardAvatar from '../'

it('renders correctly', () => {
    const component = (
        <ESCardAvatar>
            <h1>ESCardAvatar</h1>
        </ESCardAvatar>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
