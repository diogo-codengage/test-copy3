
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESThemeProvider from '../'

it('renders correctly', () => {
    const component = (
        <ESThemeProvider>
            <h1>ESThemeProvider</h1>
        </ESThemeProvider>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
