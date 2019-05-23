
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESForm from '../'

it('renders correctly', () => {
    const component = (
        <ESForm>
            <h1>ESForm</h1>
        </ESForm>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
