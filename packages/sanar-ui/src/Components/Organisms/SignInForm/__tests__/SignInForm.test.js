
import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESSignInForm from '../'

it('renders correctly', () => {
    const component = (
        <ESSignInForm>
            <h1>ESSignInForm</h1>
        </ESSignInForm>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
