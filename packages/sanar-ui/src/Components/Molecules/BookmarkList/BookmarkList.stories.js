import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { select } from '@storybook/addon-knobs'

import ESBookmarkList from './BookmarkList'

const orientationOptions = {
    grid: 'grid',
    list: 'list'
}

const items = [
    {
        resourceType: 'Video',
        title: 'Legislação do Sistema Único de Saúde e Saúde Coletiva',
        subtitle: 'Módulo 2, aula 5'
    },
    {
        resourceType: 'Document',
        title: 'Legislação do Sistema Único de Saúde e Saúde Coletiva',
        subtitle: 'Módulo 2, aula 5'
    },
    {
        resourceType: 'Question',
        subtitle: 'Módulo 2, aula 5',
        title:
            'The Inmates Are Running the Asylum, published in 1998, introduced the use of personas as a practical interaction design tool. Based on the single-chapter discussion in that book, personas rapidly gained popularity in the software industry due to their unusual power and effectiveness. Had personas been developed in the laboratory, the full story of how they came to be would have been published long ago, but since.'
    },
    {
        resourceType: 'Document',
        title: 'Legislação do Sistema Único de Saúde e Saúde Coletiva',
        subtitle: 'Módulo 2, aula 5'
    },
    {
        resourceType: 'Video',
        title: 'Video sample 2',
        subtitle: 'Módulo 2, aula 5'
    }
]

storiesOf('Molecules.BookmarkList', module).add('Simple', () => (
    <ESBookmarkList
        data={items}
        onRemove={action('onRemove')}
        onClick={action('onClick')}
        orientation={select('Orientation', orientationOptions, 'list')}
    />
))
