import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESRadioButton from '../Button'

it('renders correctly', () => {
    const component = (
        <ESRadioButton>
            <h1>ESRadio</h1>
        </ESRadioButton>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
