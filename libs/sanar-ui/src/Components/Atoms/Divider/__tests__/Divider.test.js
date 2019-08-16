import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESDivider from '../'

it('renders correctly', () => {
    const component = <ESDivider />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
