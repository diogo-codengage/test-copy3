
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESDisciplineDropdown from '../'

it('renders correctly', () => {
    const component = (
        <ESDisciplineDropdown>
            <h1>ESDisciplineDropdown</h1>
        </ESDisciplineDropdown>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
