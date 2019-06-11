
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESPracticeCompleted from '../'

it('renders correctly', () => {
    const component = (
        <ESPracticeCompleted>
            <h1>ESPracticeCompleted</h1>
        </ESPracticeCompleted>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
