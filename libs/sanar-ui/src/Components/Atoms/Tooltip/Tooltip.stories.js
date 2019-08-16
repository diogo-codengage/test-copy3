import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESButton from '../Button'
import ESTooltip from './Tooltip'

const placementOptions = {
    Top: 'top',
    Left: 'left',
    Right: 'right',
    Bottom: 'bottom',
    TopLeft: 'topLeft',
    TopRight: 'topRight',
    BottomLeft: 'bottomLeft',
    BottomRight: 'bottomRight',
    LeftTop: 'leftTop',
    LeftBottom: 'leftBottom',
    RightTop: 'rightTop',
    RightBottom: 'rightBottom'
}

const triggerOptions = {
    Hover: 'hover',
    Focus: 'focus',
    Click: 'click'
}

storiesOf('Atoms.Tooltip', module).add(
    'Simple',
    () => (
        <ESTooltip
            title={text('Title', 'propmt text')}
            arrowPointAtCenter={boolean('Arrow point center', false)}
            placement={select('Placement', placementOptions, 'bottom')}
        >
            <ESButton>Button</ESButton>
        </ESTooltip>
    ),
    {
        info: {
            propTablesExclude: [ESButton]
        }
    }
)
