import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESSessionTitle from '../'

it('renders correctly', () => {
    const component = (
        <ESSessionTitle
            title='Meu desenvolvimento'
            subtitle='Vejas as indicações de como você está se saindo no seu aprendizado com seu curso'
        />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
