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
        image='http://www.unirio.br/arquivocentral/imagens/localizacao.png/image_preview'
        items={items}
        defaultSelectedItems={[items[0], items[3]]}
    />
))
