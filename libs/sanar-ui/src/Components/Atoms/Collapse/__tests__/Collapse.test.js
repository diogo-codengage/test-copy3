import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESCollapse, { ESCollapsePanel } from '../'

it('renders correctly', () => {
    const component = (
        <ESCollapse>
            <ESCollapsePanel header='Ocultar filtros avançados' customKey='1'>
                <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Praesent vel
                    viverra nisi. Mauris aliquet nunc non turpis scelerisque,
                    eget. Admodum accumsan disputationi eu sit. Vide electram
                    sadipscing et per. Mais vale um bebadis conhecidiss, que um
                    alcoolatra anonimis. Delegadis gente finis, bibendum egestas
                    augue arcu ut est.
                </p>
            </ESCollapsePanel>
            <ESCollapsePanel header='Ocultar filtros avançados' customKey='2'>
                <p>
                    Mussum Ipsum, cacilds vidis litro abertis. Praesent vel
                    viverra nisi. Mauris aliquet nunc non turpis scelerisque,
                    eget. Admodum accumsan disputationi eu sit. Vide electram
                    sadipscing et per. Mais vale um bebadis conhecidiss, que um
                    alcoolatra anonimis. Delegadis gente finis, bibendum egestas
                    augue arcu ut est.
                </p>
            </ESCollapsePanel>
        </ESCollapse>
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
