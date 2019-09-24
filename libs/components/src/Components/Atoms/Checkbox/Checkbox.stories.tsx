import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'

import SANCheckbox from './Checkbox'

storiesOf('Atoms.Checkbox', module).add('Simple', () => (
    <SANCheckbox
        disabled={boolean('Disabled', false)}
        checked={boolean('Checked', false)}
        defaultChecked={boolean('Default Checked', false)}
        onChange={action('onChange')}
        indeterminate={boolean('Indeterminate', false)}
    >
        {text('Text', 'Manter logado')}
    </SANCheckbox>
))
