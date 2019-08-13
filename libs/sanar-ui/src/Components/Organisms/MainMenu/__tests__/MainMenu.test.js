import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESMainMenu from '../'

it('renders correctly', () => {
    const component = <ESMainMenu title='Menu' />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
