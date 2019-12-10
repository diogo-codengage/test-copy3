import gql from 'graphql-tag'

export interface ISupplementarySpecialties {
    id: string
    name: string
}

export const GET_SUPPLEMENTARY_SPECIALTIES = gql`
    {
        supplementarySpecialties {
            id
            name
        }
    }
`
