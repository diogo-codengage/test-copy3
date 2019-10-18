import React from 'react'
import { storiesOf } from '@storybook/react'
import SANSearchResultList from './SearchResult'
import SANSearchResultItem, { IItem } from './SearchResultItem'

const data: IItem[] = [
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        image:
            'https://dhg1h5j42swfq.cloudfront.net/2018/05/02151819/Concurso-Medicina-para-Tribunais-conhe%C3%A7a-os-benef%C3%ADcios-e-vantagens-da-carreira-p%C3%BAblica.jpg',
        type: 'course',
        themes: 10
    },
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        image:
            'https://dhg1h5j42swfq.cloudfront.net/2018/05/02151819/Concurso-Medicina-para-Tribunais-conhe%C3%A7a-os-benef%C3%ADcios-e-vantagens-da-carreira-p%C3%BAblica.jpg',
        type: 'course',
        themes: 10,
        isNew: true,
        isPopular: true
    },
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'lesson',
        isNew: true,
        timeInSeconds: 1080,
        professorName: 'Diogo Biz',
        course: 'Endocrinologia'
    },
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'resume',
        pages: 10,
        professorName: 'Diogo Biz',
        course: 'Endocrinologia'
    },
    ,
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'lesson',
        isPopular: true,
        timeInSeconds: 1080,
        professorName: 'Diogo Biz',
        course: 'Endocrinologia'
    },
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'mentalmap',
        course: 'Endocrinologia'
    },
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'article',
        pages: 10,
        course: 'Endocrinologia'
    },
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'question',
        course: 'Endocrinologia'
    },
    {
        resourceTitle: 'Nome do Arquivo - Subtítulo do arquivo',
        type: 'flowchart',
        course: 'Endocrinologia'
    }
]

const renderItem = (item: IItem) => (
    <SANSearchResultItem item={item} onClick={console.log} />
)

storiesOf('Organisms.SearchResult', module).add('Simple', () => (
    <SANSearchResultList dataSource={data} renderItem={renderItem} />
))
