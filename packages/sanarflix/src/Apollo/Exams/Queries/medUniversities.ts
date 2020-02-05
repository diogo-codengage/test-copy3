import gql from 'graphql-tag'

export interface IMedUniversity {
    id: string
    label: string
}

export interface IMedUniversityQuery {
    medUniversities: IMedUniversity[]
}

export const GET_MED_UNIVERSITIES = gql`
    {
        medUniversities {
            id: id
            label: name
        }
    }
`
