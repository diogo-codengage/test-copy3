import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESImageViewer from '../'

it('renders correctly', () => {
    const component = (
        <ESImageViewer image='https://i.pinimg.com/736x/28/65/74/28657471c865a566cf1347ae44bb388c.jpg' />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
