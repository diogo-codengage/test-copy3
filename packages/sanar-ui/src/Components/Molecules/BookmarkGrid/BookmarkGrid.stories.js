import React from 'react'
import { storiesOf } from '@storybook/react'
import ESBookmarkGrid from './BookmarkGrid'
import videoImage from '../../../assets/images/favorite-grid/grid-video.png'
import documentImage from '../../../assets/images/favorite-grid/grid-document.png'

const items = [
    {
        resourceType: 'Video',
        title: 'Video sample',
        subtitle: 'Sample of a video',
        image: videoImage,
        icon: 'play-circle-outline',
        action: () => console.log('clicked on item 001')
    },
    {
        resourceType: 'Document',
        title: 'Document sample',
        subtitle: 'Sample for a doc',
        image: documentImage,
        icon: 'book-open-outline',
        action: () => console.log('clicked on item 002')
    },
    {
        resourceType: 'Question',
        title: 'Question sample',
        subtitle: 'Sample for question',
        preview:
            'The Inmates Are Running the Asylum, published in 1998, introduced the use of personas as a practical interaction design tool. Based on the single-chapter discussion in that book, personas rapidly gained popularity in the software industry due to their unusual power and effectiveness. Had personas been developed in the laboratory, the full story of how they came to be would have been published long ago, but since…',
        image: null,
        icon: 'edit-outline',
        action: () => console.log('clicked on item 003')
    },
    {
        resourceType: 'Document',
        title: 'Document sample 2',
        subtitle: 'Sample for a doc',
        image: documentImage,
        icon: 'book-open-outline',
        action: () => console.log('clicked on item 002')
    },
    {
        resourceType: 'Video',
        title: 'Video sample 2',
        subtitle: 'Sample of a video',
        image: videoImage,
        icon: 'play-circle-outline',
        action: () => console.log('clicked on item 001')
    }
]

storiesOf('Molecules.FavoriteGrid', module).add('Video', () => (
    <ESBookmarkGrid data={items} />
))
