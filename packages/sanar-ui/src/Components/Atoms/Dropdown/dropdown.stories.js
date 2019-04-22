import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESDropdown, { ESDropdownButton } from './'
import ESMenu, { ESItem, ESDivider } from '../Menu'
import ESButton from '../Button'

const menu = (
    <ESMenu>
        <ESItem key='1'>Item 1</ESItem>
        <ESItem key='2'>Item 2</ESItem>
        <ESDivider />
        <ESItem key='3'>Item 3</ESItem>
    </ESMenu>
)

const triggerOptions = {
    Hover: ['hover'],
    Click: ['click'],
    ContextMenu: ['contextMenu']
}

const placementOptions = {
    BottomLeft: 'bottomLeft',
    BottomCenter: 'bottomCenter',
    BottomRight: 'bottomRight',
    TopLef: 'topLeft',
    TopCenter: 'topCenter',
    TopRight: 'topRight'
}

storiesOf('Atoms.Dropdown', module)
    .add(
        'Simple',
        () => (
            <ESDropdown
                overlay={menu}
                disabled={boolean('Disabled', false)}
                trigger={select('Trigger', triggerOptions, ['hover'])}
                placement={select('Placement', placementOptions, 'bottomLeft')}
            >
                <ESButton>{text('Text', 'Dropdown')}</ESButton>
            </ESDropdown>
        ),
        {
            info: {
                propTablesExclude: [ESButton]
            }
        }
    )
    .add('Button', () => (
        <ESDropdownButton
            overlay={menu}
            disabled={boolean('Disabled', false)}
            trigger={select('Trigger', triggerOptions, ['hover'])}
            placement={select('Placement', placementOptions, 'bottomLeft')}
        >
            Dropdown Button
        </ESDropdownButton>
    ))
