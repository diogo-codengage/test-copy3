import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCard from '../'

it('renders correctly', () => {
    const component = (
        <ESCard title='Card test'>
            <h1>Card</h1>
        </ESCard>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
