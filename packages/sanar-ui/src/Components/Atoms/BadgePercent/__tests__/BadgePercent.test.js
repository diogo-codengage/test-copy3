import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESBadgePercent from '../'
it('renders correctly', () => {
    const component = <ESBadgePercent count={50} />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
