
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESRadio from '../'

it('renders correctly', () => {
    const component = (
        <ESRadio>
            <h1>ESRadio</h1>
        </ESRadio>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
