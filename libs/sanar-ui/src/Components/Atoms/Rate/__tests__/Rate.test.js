import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESRate from '../'

it('renders correctly', () => {
    const component = <ESRate />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
