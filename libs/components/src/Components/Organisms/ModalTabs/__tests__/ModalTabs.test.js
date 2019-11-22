import React from 'react'
import TestRenderer from 'react-test-renderer'

import SANModalTabs from '..'

it('renders correctly', () => {
    const component = (
        <SANModalTabs>
            <h1>SANModalTabs</h1>
        </SANModalTabs>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
