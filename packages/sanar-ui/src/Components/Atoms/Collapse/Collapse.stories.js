import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESCollapse from './Collapse'
import ESCollapsePanel from './CollapsePanel'

const positionOptions = {
    Left: 'left',
    Right: 'right'
}

storiesOf('Atoms.Collapse', module).add('Simple', () => (
    <ESCollapse
        bordered={boolean('Bordered', true)}
        accordion={boolean('Accordion', false)}
        expandIconPosition={select(
            'Expand Icon Position',
            positionOptions,
            'left'
        )}
    >
        <ESCollapsePanel
            header={text('Header', 'Ocultar filtros avançados')}
            disabled={boolean('Disabled', false)}
            showArrow={boolean('Show arrow', true)}
            customKey='1'
        >
            <p>
                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                accumsan disputationi eu sit. Vide electram sadipscing et per.
                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                Delegadis gente finis, bibendum egestas augue arcu ut est.
            </p>
        </ESCollapsePanel>
        <ESCollapsePanel header='Ocultar filtros avançados' customKey='2'>
            <p>
                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                accumsan disputationi eu sit. Vide electram sadipscing et per.
                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                Delegadis gente finis, bibendum egestas augue arcu ut est.
            </p>
        </ESCollapsePanel>
    </ESCollapse>
))
