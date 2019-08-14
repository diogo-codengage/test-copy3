import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'

import ESSelect from './Select'
import ESOption from './Option'

storiesOf('Atoms.Select', module).add(
    'Simple',
    () => (
        <ESSelect
            style={{ width: 200 }}
            showSearch={boolean('Show search', true)}
            showArrow={boolean('Show arrow', true)}
            loading={boolean('Loading', false)}
            filterOption={boolean('FilterOption', true)}
            disabled={boolean('Disabled', false)}
            placeholder={text('Placeholder', 'Select a person')}
            onChange={action('onChange')}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
            onSearch={action('onSearch')}
        >
            <ESOption value='jack'>Jack</ESOption>
            <ESOption value='lucy'>Lucy</ESOption>
            <ESOption value='tom'>Tom</ESOption>
        </ESSelect>
    ),
    {
        info: {
            styles: stylesheet => ({
                ...stylesheet,
                infoBody: {
                    ...stylesheet.infoBody,
                    border: 'none',
                    margin: '30px 0 0 0',
                    padding: 0
                }
            })
        }
    }
)
