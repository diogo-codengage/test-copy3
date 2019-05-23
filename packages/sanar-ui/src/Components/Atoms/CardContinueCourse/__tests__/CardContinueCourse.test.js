
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCardContinueCourse from '../'

it('renders correctly', () => {
    const component = (
        <ESCardContinueCourse>
            <h1>ESCardContinueCourse</h1>
        </ESCardContinueCourse>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
