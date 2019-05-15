
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESChangeCourse from '../'

it('renders correctly', () => {
    const component = (
        <ESChangeCourse>
            <h1>ESChangeCourse</h1>
        </ESChangeCourse>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
