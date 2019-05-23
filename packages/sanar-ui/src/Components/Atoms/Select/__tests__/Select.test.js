import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESSelect, { ESOption } from '../'

it('renders correctly', () => {
    const component = (
        <ESSelect style={{ width: 200 }} placeholder='Select a person'>
            <ESOption value='jack'>Jack</ESOption>
            <ESOption value='lucy'>Lucy</ESOption>
            <ESOption value='tom'>Tom</ESOption>
        </ESSelect>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
