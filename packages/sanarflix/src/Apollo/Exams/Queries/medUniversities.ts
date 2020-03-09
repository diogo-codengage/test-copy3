import gql from 'graphql-tag'

export interface IMedUniversity {
    id: string
    label: string
}

export interface IMedUniversityQuery {
    medUniversities: {
        data: IMedUniversity[]
    }
}

export const GET_MED_UNIVERSITIES = gql`
    {
        medUniversities {
            data {
                id: id
                label: name
            }
        }
    }
`
