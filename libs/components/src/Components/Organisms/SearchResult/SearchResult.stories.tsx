import React from 'react'
import { storiesOf } from '@storybook/react'
import SANSearchResult from './SearchResult'

type ResourceType =
    | 'Book'
    | 'Course'
    | 'Content'
    | 'Question'
    | 'Quiz'
    | 'Video'
    | 'Document'
    | 'Download'

interface Course {
    id: string
    name: string
}

interface Theme {
    id: string
    name: string
}

interface CoverPicture {
    small: SizeImage
    medium?: SizeImage
    large?: SizeImage
    original?: SizeImage
}

interface SizeImage {
    filename: string
    url: string
}

interface IExample {
    resourceTitle: string
    resourceId: string
    resourceType: ResourceType
    totalPages?: number
    timeInSeconds?: number
    coverPictures: CoverPicture
    course?: Course
    theme?: Theme
    type?: string
    isNew?: boolean
    professorName?: string
}

const data: IExample[] = [
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        resourceId: '1',
        resourceType: 'Course',
        coverPictures: {
            small: {
                filename: '',
                url: ''
            }
        },
        type: 'string'
    }
]

const renderItem = (item: IExample) => <div>{item.resourceTitle}</div>

storiesOf('Organisms.SearchResult', module).add('Simple', () => (
    <SANSearchResult<IExample> dataSource={data} renderItem={renderItem} />
))
