import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCommonBadge from '..'
it('renders correctly', () => {
    const component = <ESCommonBadge count={50} />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
