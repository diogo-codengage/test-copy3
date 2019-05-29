
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCardSelectFilter from '../'

it('renders correctly', () => {
    const component = (
        <ESCardSelectFilter>
            <h1>ESCardSelectFilter</h1>
        </ESCardSelectFilter>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
