
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESLessonHeader from '../'

it('renders correctly', () => {
    const component = (
        <ESLessonHeader>
            <h1>ESLessonHeader</h1>
        </ESLessonHeader>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
