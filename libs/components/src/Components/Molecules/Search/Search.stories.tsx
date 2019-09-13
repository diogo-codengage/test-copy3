import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import SANSearch from './Search'

const data = [
    {
        id: '1',
        title: 'Febre Reumática',
        onClick: () => console.log('Febre Reumática')
    },
    {
        id: '2',
        title: 'Febre Amarela',
        onClick: () => console.log('Febre Amarela')
    },
    {
        id: '3',
        title: 'Dor e Febre',
        onClick: () => console.log('Dor e Febre')
    },
    { id: '4', title: 'Febril', onClick: () => console.log('Febril') },
    {
        id: '5',
        title: 'Sintomas de Febre',
        onClick: () => console.log('Sintomas de Febre')
    }
]

const Controlled = () => {
    const [value, setValue] = useState('')
    const [items, fetchItems] = useState([])

    const onSearch = () => {
        if (!!value.trim().length) {
            setTimeout(() => fetchItems(data), 1000)
        }
    }

    const onChange = value => {
        setValue(value)
        if (!!value && value.length > 3) {
            onSearch()
        }
    }

    return (
        <>
            <SANSearch
                InputProps={{
                    placeholder:
                        'Busque por cursos, aulas, resumos e muito mais…',
                    size: 'large',
                    value,
                    onChange: e => onChange(e.target.value)
                }}
                seeMore={console.log}
                onEnter={onSearch}
                data={items}
            />
            <div>dasdasd</div>
        </>
    )
}

storiesOf('Molecules.Search', module).add('Simple', () => <Controlled />, {
    style: {
        padding: 20,
        backgroundColor: '#fff'
    }
})
