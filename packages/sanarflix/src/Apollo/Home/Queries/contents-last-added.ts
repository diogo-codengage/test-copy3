import gql from 'graphql-tag'

type Type =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'

export interface IContent {
    id: string
    title: string
    thumbnail: string
    type: Type
}

export interface IContents {
    lastAddedContents: IContent[]
}

export const GET_CONTENTS_LAST_ADDED = gql`
    {
        lastAddedContents(limit: 50) {
            id
            title
            thumbnail
            type
        }
    }
`