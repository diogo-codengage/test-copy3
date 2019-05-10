
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESRecentSavedListItem from '../'

it('renders correctly', () => {
    const component = (
        <ESRecentSavedListItem>
            <h1>ESRecentSavedListItem</h1>
        </ESRecentSavedListItem>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
