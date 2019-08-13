import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESModalTabs from '..'

it('renders correctly', () => {
    const component = (
        <ESModalTabs>
            <h1>ESModalTabs</h1>
        </ESModalTabs>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
