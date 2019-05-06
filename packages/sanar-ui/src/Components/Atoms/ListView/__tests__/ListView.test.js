
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESListView from '../'

it('renders correctly', () => {
    const component = (
        <ESListView>
            <h1>ESListView</h1>
        </ESListView>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
