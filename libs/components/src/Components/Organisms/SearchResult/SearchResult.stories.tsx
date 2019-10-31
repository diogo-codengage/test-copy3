import React from 'react'
import { storiesOf } from '@storybook/react'
import SANSearchResultList from './SearchResult'
import SANSearchResultItem, { IItem } from './SearchResultItem'

const data: IItem[] = [
    {
        resourceId: '1',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        image:
            'https://dhg1h5j42swfq.cloudfront.net/2018/05/02151819/Concurso-Medicina-para-Tribunais-conhe%C3%A7a-os-benef%C3%ADcios-e-vantagens-da-carreira-p%C3%BAblica.jpg',
        type: 'course',
        totalThemes: 10
    },
    {
        resourceId: '2',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        image:
            'https://dhg1h5j42swfq.cloudfront.net/2018/05/02151819/Concurso-Medicina-para-Tribunais-conhe%C3%A7a-os-benef%C3%ADcios-e-vantagens-da-carreira-p%C3%BAblica.jpg',
        type: 'course',
        totalThemes: 10,
        isNew: true,
        isPopular: true
    },
    {
        resourceId: '3',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'lesson',
        isNew: true,
        timeInSeconds: 1080,
        professorName: 'Diogo Biz',
        course: {
            id: '1',
            name: 'Endocrinologia'
        }
    },
    {
        resourceId: '3',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'resume',
        totalPages: 10,
        professorName: 'Diogo Biz',
        course: {
            id: '1',
            name: 'Endocrinologia'
        }
    },
    ,
    {
        resourceId: '4',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'lesson',
        isPopular: true,
        timeInSeconds: 1080,
        professorName: 'Diogo Biz',
        course: {
            id: '1',
            name: 'Endocrinologia'
        }
    },
    {
        resourceId: '5',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'mentalmap',
        course: {
            id: '1',
            name: 'Endocrinologia'
        }
    },
    {
        resourceId: '6',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'article',
        totalPages: 10,
        course: {
            id: '1',
            name: 'Endocrinologia'
        }
    },
    {
        resourceId: '7',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'question',
        course: {
            id: '1',
            name: 'Endocrinologia'
        }
    },
    {
        resourceId: '8',
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'flowchart',
        course: {
            id: '1',
            name: 'Endocrinologia'
        }
    }
]

const renderItem = (item: IItem) => (
    <SANSearchResultItem item={item} onClick={console.log} />
)

storiesOf('Organisms.SearchResult', module).add('Simple', () => (
    <SANSearchResultList dataSource={data} renderItem={renderItem} />
))
