
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESSplashLoader from '../'

it('renders correctly', () => {
    const component = (
        <ESSplashLoader>
            <h1>ESSplashLoader</h1>
        </ESSplashLoader>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
