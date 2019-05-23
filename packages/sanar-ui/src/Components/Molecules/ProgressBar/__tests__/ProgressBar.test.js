import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESProgressBar from '../'

it('renders correctly', () => {
    const component = <ESProgressBar percent={30} />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
