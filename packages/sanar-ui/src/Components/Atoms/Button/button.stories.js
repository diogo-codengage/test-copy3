import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESButton from './Button'
import ESButtonGroup from './ButtonGroup'
import ESIcon from '../Icon'

const props = {
    onClick: action('clicked')
}

const typeOptions = {
    Default: 'default ',
    Primary: 'primary',
    Dashed: 'dashed',
    Danger: 'danger'
}

const sizeOptions = {
    Default: 'default',
    Large: 'large',
    Small: 'small'
}

const shapeOptions = {
    Default: false,
    Round: 'round',
    Circle: 'circle'
}

storiesOf('Atoms.Button', module)
    .add('Simple', () => (
        <ESButton
            {...props}
            disabled={boolean('Disabled', false)}
            clear={boolean('Clear', false)}
            ghost={boolean('Ghost', false)}
            block={boolean('Block', false)}
            loading={boolean('Loading', false)}
            shape={select('Shape', shapeOptions, false)}
            type={select('Type', typeOptions, 'default')}
            size={select('Size', sizeOptions, 'default')}
            icon={text(
                'Icon',
                'Veja todos o icons em: https://ant.design/components/icon/'
            )}
        >
            {text('Label', 'Default')}
        </ESButton>
    ))
    .add(
        'Group',
        () => (
            <ESButtonGroup>
                <ESButton {...props}>Default</ESButton>
                <ESButton {...props} type='primary'>
                    Primary
                </ESButton>
                <ESButton {...props} type='dashed'>
                    Dashed
                </ESButton>
                <ESButton {...props} type='danger'>
                    Danger
                </ESButton>
            </ESButtonGroup>
        ),
        {
            info: {
                propTablesExclude: [ESButton]
            }
        }
    )
