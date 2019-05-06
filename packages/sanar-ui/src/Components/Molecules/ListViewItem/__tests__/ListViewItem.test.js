
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESListViewItem from '../'

it('renders correctly', () => {
    const component = (
        <ESListViewItem>
            <h1>ESListViewItem</h1>
        </ESListViewItem>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
