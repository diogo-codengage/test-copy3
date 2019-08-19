import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'

import SANCollapse from './Collapse'
import SANCollapsePanel from './CollapsePanel'

const positionOptions = {
    Left: 'left',
    Right: 'right'
}

storiesOf('Atoms.Collapse', module).add('Simple', () => (
    <SANCollapse
        bordered={boolean('Bordered', true)}
        accordion={boolean('Accordion', false)}
        expandIconPosition={select(
            'Expand Icon Position',
            positionOptions,
            'left'
        )}
    >
        <SANCollapsePanel
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
        </SANCollapsePanel>
        <SANCollapsePanel header='Ocultar filtros avançados' customKey='2'>
            <p>
                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                accumsan disputationi eu sit. Vide electram sadipscing et per.
                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                Delegadis gente finis, bibendum egestas augue arcu ut est.
            </p>
        </SANCollapsePanel>
    </SANCollapse>
))
