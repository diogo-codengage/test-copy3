
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESQuestionMap from '../'

it('renders correctly', () => {
    const component = (
        <ESQuestionMap>
            <h1>ESQuestionMap</h1>
        </ESQuestionMap>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
