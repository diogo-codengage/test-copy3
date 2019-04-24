import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESEvaIcon from '../'
it('renders correctly', () => {
    const component = <ESEvaIcon name='award-outline' />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
