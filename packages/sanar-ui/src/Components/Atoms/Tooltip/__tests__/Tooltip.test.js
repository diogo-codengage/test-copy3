
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESTooltip from '../'

it('renders correctly', () => {
    const component = (
        <ESTooltip>
            <h1>ESTooltip</h1>
        </ESTooltip>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
