
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESAvatarListItem from '../'

it('renders correctly', () => {
    const component = (
        <ESAvatarListItem>
            <h1>ESAvatarListItem</h1>
        </ESAvatarListItem>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
