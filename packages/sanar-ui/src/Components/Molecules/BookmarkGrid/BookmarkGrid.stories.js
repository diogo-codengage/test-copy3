import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ESBookmarkGrid from './BookmarkGrid'

import videoImage from '../../../assets/images/favorite-grid/grid-video.png'
import documentImage from '../../../assets/images/favorite-grid/grid-document.png'

const items = [
    {
        resourceType: 'Video',
        title: 'Legislação do Sistema Único de Saúde e Saúde Coletiva',
        subtitle: 'Módulo 2, aula 5',
        image: videoImage,
        onPress: action('onPress'),
        onRemove: action('onRemove')
    },
    {
        resourceType: 'Document',
        title: 'Legislação do Sistema Único de Saúde e Saúde Coletiva',
        subtitle: 'Módulo 2, aula 5',
        image: documentImage,
        onPress: action('onPress'),
        onRemove: action('onRemove')
    },
    {
        resourceType: 'Question',
        subtitle: 'Módulo 2, aula 5',
        title:
            'The Inmates Are Running the Asylum, published in 1998, introduced the use of personas as a practical interaction design tool. Based on the single-chapter discussion in that book, personas rapidly gained popularity in the software industry due to their unusual power and effectiveness. Had personas been developed in the laboratory, the full story of how they came to be would have been published long ago, but since.',
        onPress: action('onPress'),
        onRemove: action('onRemove')
    },
    {
        resourceType: 'Document',
        title: 'Legislação do Sistema Único de Saúde e Saúde Coletiva',
        subtitle: 'Módulo 2, aula 5',
        image: documentImage,
        onPress: action('onPress'),
        onRemove: action('onRemove')
    },
    {
        resourceType: 'Video',
        title: 'Video sample 2',
        subtitle: 'Módulo 2, aula 5',
        image: videoImage,
        onPress: action('onPress'),
        onRemove: action('onRemove')
    }
]

storiesOf('Molecules.BookmarkGrid', module).add('Video', () => (
    <ESBookmarkGrid data={items} />
))
