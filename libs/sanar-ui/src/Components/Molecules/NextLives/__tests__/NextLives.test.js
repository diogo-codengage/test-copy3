import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESNextLives from '../'
import ESCardNextLive from '../../../Atoms/CardNextLive'

const Lives = props => (
    <ESCardNextLive
        title='Live de Correção da prova SUS-SP 2019'
        date='27/04/2019 às 10h'
        {...props}
    />
)

it('renders correctly', () => {
    const component = (
        <ESNextLives>
            {[0, 1, 2, 3, 4, 6, 7].map((e, i) => (
                <div key={i}>
                    <Lives style={{ margin: '0 16px' }} />
                </div>
            ))}
        </ESNextLives>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
