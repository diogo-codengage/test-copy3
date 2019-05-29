import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text, boolean } from '@storybook/addon-knobs'

import ESCardSelectFilter from './CardSelectFilter'

const items = [
    {
        label: 'Aparência',
        value: 1
    },
    {
        label: 'Mal funcionamento',
        value: 2
    },
    {
        label: 'Desempenho',
        value: 3
    },
    {
        label: 'Conteúdo',
        value: 4
    },
    {
        label: 'Conteúdo',
        value: 5
    },
    {
        label: 'Conteúdo',
        value: 6
    },
    {
        label: 'Conteúdo',
        value: 7
    },
    {
        label: 'Conteúdo',
        value: 8
    },
    {
        label: 'Conteúdo',
        value: 9
    }
]

storiesOf('Molecules.CardSelectFilter', module).add('Simple', () => (
    <ESCardSelectFilter
        labelSelecteds={text('Label selecteds', 'Especialidades')}
        placeholder={text('Placeholder', 'Escolher especialidades')}
        filterName={text('Filter name', 'Especialidade')}
        image='https://public-v2links.adobecc.com/4c410069-6394-48fa-541c-bc910177739e/component?params=component_id:dd16791c-b71d-445b-a86d-e4d7439afb08&params=version:0&token=1559235271_da39a3ee_ba23828d0c23e3335a51dd740aef643486573a74&api_key=CometServer1'
        items={items}
        defaultSelectedItems={[items[0], items[3]]}
    />
))
