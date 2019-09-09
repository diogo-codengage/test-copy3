import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESTextEditor from '../'

it('renders correctly', () => {
    const component = <ESTextEditor />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
