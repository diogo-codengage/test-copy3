import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCarousel from '../'

it('renders correctly', () => {
    const component = (
        <ESCarousel arrows={true}>
            {[0, 1, 2, 3, 4, 6, 7].map((e, i) => (
                <div key={i}>
                    <h2>{i}</h2>
                </div>
            ))}
        </ESCarousel>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
