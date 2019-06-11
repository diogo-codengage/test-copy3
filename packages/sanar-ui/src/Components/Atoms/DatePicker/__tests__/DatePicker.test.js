import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESDatePicker from '../'

it('renders correctly', () => {
    const component = <ESDatePicker />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
