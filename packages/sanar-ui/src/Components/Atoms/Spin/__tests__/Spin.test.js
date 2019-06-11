import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESSpin from '../'

it('renders correctly', () => {
    const component = <ESSpin />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
