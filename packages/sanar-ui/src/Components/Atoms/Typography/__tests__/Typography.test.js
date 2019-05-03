
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESTypography from '../'

it('renders correctly', () => {
    const component = (
        <ESTypography>
            <h1>ESTypography</h1>
        </ESTypography>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
