import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESTypography from '../'

it('renders correctly', () => {
    const component = <ESTypography>ESTypography</ESTypography>

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
