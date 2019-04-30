import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESBadge from '../'

it('renders correctly', () => {
    const component = <ESBadge count={3} />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
