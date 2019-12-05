import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import SANSelectFilter from './SelectFilter'

const items = [
    {
        label: 'Acupuntura',
        value: '1'
    },
    {
        label: 'Alergia e imunologia',
        value: '2'
    },
    {
        label: 'Anestesiologia',
        value: '3'
    },
    {
        label: 'Angiologia',
        value: '4'
    },
    {
        label: 'Cardiologia',
        value: '5'
    },
    {
        label: 'Cirurgia cardiovascular',
        value: '6'
    },
    {
        label: 'Cirurgia da mão',
        value: '7'
    },
    {
        label: 'Conteúdo',
        value: '8'
    }
]
const SelectFilter = () => {
    const [selecteds, setSelecteds] = useState([])

    const onChange = (list, event) => {
        console.log('onChange', list, event)
        setSelecteds(list)
    }
    const onClear = () => {
        console.log('onClear')
    }
    const onDeselectItem = item => {
        console.log('onDeselectItem', item)
    }
    const onOpen = visible => {
        console.log('onOpen', visible)
    }
    const onClose = visible => {
        console.log('onClose', visible)
    }
    const onSelectAll = list => {
        console.log('onSelectAll', list)
    }
    const onSelectItem = item => {
        console.log('onSelectItem', item)
    }
    return (
        <SANSelectFilter
            placeholder={text('Placeholder to input search', 'Digite aqui')}
            items={items}
            value={selecteds}
            onOpen={onOpen}
            onClose={onClose}
            onChange={onChange}
            onSelectAll={onSelectAll}
            onClear={onClear}
            onSelectItem={onSelectItem}
            onDeselectItem={onDeselectItem}
        />
    )
}
storiesOf('Molecules.SelectFilter', module).add('Simple', () => (
    <SelectFilter />
))
