import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESI18nProvider from '../'

it('renders correctly', () => {
    const component = <ESI18nProvider />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
