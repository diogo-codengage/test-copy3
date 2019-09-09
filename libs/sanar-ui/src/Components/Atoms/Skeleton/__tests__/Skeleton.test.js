
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESSkeleton from '../'

it('renders correctly', () => {
    const component = (
        <ESSkeleton>
            <h1>ESSkeleton</h1>
        </ESSkeleton>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
