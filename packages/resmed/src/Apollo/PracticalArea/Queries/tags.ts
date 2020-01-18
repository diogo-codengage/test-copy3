import gql from 'graphql-tag'

export interface ITag {
    value: string
    label: string
}

export interface ITagsQuery {
    tags: ITag[]
}

export const GET_TAGS = gql`
    {
        tags {
            value: id
            label: name
        }
    }
`
