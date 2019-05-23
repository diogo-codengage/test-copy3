import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCardCourseModule from '../CardCourseModule'

it('renders correctly', () => {
    const component = (
        <ESCardCourseModule>
            <h1>ESCardCourseModule</h1>
        </ESCardCourseModule>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
