import gql from 'graphql-tag'

export interface ICategory {
    value: string
    label: string
}

export interface ICategoriesQuery {
    questionCategories: ICategory[]
}

export const GET_CATEGORIES = gql`
    {
        questionCategories {
            value: id
            label: name
        }
    }
`
