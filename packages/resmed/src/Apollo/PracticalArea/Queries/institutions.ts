import gql from 'graphql-tag'

export interface IInstitution {
    value: string
    label: string
}

export interface IInstitutionsQuery {
    institutions: IInstitution[]
}

export const GET_INSTITUTIONS = gql`
    {
        institutions {
            value: id
            label: name
        }
    }
`
