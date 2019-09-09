import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESRadioGroup from '../Group'

it('renders correctly', () => {
    const component = (
        <ESRadioGroup>
            <h1>ESRadio</h1>
        </ESRadioGroup>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
