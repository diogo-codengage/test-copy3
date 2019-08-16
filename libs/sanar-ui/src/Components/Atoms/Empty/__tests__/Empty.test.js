
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESEmpty from '../'

it('renders correctly', () => {
    const component = (
        <ESEmpty>
            <h1>ESEmpty</h1>
        </ESEmpty>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
