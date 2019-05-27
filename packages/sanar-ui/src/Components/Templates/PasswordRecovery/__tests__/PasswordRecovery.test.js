import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESPasswordRecoveryTemplate from '../'

it('renders correctly', () => {
    const component = (
        <ESPasswordRecoveryTemplate>
            <h1>ESPasswordRecoveryTemplate</h1>
        </ESPasswordRecoveryTemplate>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
