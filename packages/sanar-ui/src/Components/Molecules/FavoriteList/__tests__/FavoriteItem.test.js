import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESFavoriteList from '../'

it('renders correctly', () => {
    const component = <ESFavoriteList />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
