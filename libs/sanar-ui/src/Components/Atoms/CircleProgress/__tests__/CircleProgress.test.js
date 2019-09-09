import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCircleProgress from '../'

it('renders correctly', () => {
    const component = <ESCircleProgress percent={50} />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
