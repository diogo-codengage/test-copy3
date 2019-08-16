import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCardNextLive from '../'

it('renders correctly', () => {
    const component = (
        <ESCardNextLive
            title='Live de Correção da prova SUS-SP 2019'
            date='27/04/2019 às 10h'
        />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
