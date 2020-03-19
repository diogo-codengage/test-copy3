import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import SANSelectList from './SelectList'

const items = new Array(10).fill(1).map((_, index) => ({
    value: (index + 1).toString(),
    label: `Item ${index + 1}`
}))

const Example = () => {
    const [value, setValue] = useState()

    return (
        <SANSelectList
            placeholder='Buscar tema'
            items={items}
            onChange={setValue}
            value={value}
            loading={boolean('Loading', false)}
        />
    )
}

storiesOf('Organisms.SelectList', module).add('Simple', () => <Example />, {
    style: {
        minHeight: 350
    }
})
