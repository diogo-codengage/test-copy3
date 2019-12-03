import gql from 'graphql-tag'

export interface ISpecialty {
    id: string
    title: string
}

export interface ISpecialtyQuery {
    specialty: ISpecialty
}

export const GET_SPECIALTY = gql`
    query Specialty($id: ID!) {
        specialty(where: { id: $id }) {
            id
            title: name
        }
    }
`
