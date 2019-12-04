import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

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
    const [makedPlaceholder, setMakePlaceholder] = useState('')

    const onChange = (list, item) => {
        console.log('onChange', list, item)
    }
    const onClear = () => {
        console.log('onClear')
        setSelecteds([])
        setMakePlaceholder('')
    }
    const onDeselectItem = item => {
        console.log('onDeselectItem', item)
        let aux = []
        selecteds.forEach(vl => {
            vl !== item && aux.push(vl)
        })
        setMakePlaceholder(
            old =>
                `${old
                    .replace(`${item.label}, `, '')
                    .replace(`, ${item.label}`, '')
                    .replace(item.label, '')}`
        )
        console.log('aux', aux)
        setSelecteds(aux)
    }
    const onOpen = visible => {
        console.log('onOpen', visible)
    }
    const onSelectAll = list => {
        console.log('onSelectAll', list)
        setSelecteds(list)
        let aux = ''
        list.forEach((lt, index) => {
            aux = index === 0 ? `${lt.label}` : `${aux}, ${lt.label}`
        })
        setMakePlaceholder(aux)
    }
    const onSelectItem = item => {
        console.log('onSelectItem', item)
        setSelecteds(old => [...old, item])
        setMakePlaceholder(old => `${old && `${old},`} ${item.label}`)
    }
    return (
        <SANSelectFilter
            labelSelecteds={makedPlaceholder}
            items={items}
            value={selecteds}
            onOpen={onOpen}
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
