import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESButton from './Button'
import ESButtonGroup from './ButtonGroup'

const sizeOptions = {
    Xsmall: 'xsmall',
    Small: 'small',
    Medium: 'medium',
    Large: 'large'
}

const variantOptions = {
    Solid: 'solid',
    Outlined: 'outlined',
    Text: 'text'
}

const colorOptions = {
    Primary: 'primary',
    White: 'white',
    Default: 'default'
}

storiesOf('Atoms.Button', module)
    .add('Simple', () => (
        <ESButton
            disabled={boolean('Disabled', false)}
            block={boolean('Block', false)}
            variant={select('Variant', variantOptions, 'outlined')}
            color={select('Color', colorOptions, 'default')}
            size={select('Size', sizeOptions, 'small')}
        >
            {text('Label', 'Default')}
        </ESButton>
    ))
    .add(
        'Group',
        () => (
            <ESButtonGroup>
                <ESButton size='small'>Todos</ESButton>
                <ESButton size='small'>Concluídos</ESButton>
                <ESButton size='small'>Incompletos</ESButton>
            </ESButtonGroup>
        ),
        {
            info: {
                propTablesExclude: [ESButton]
            }
        }
    )
