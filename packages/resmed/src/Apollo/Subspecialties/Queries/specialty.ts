import gql from 'graphql-tag'

interface IProgress {
    all: number
    me: number
}

interface ISpecialty {
    id: string
    name: string
    progress: IProgress
}

export interface ISpecialtyQuery {
    specialty: ISpecialty
}

export interface ISpecialtyVariables {
    id: string
}

export const GET_SPECIALTY = gql`
    query Specialty($id: ID!) {
        specialty(where: { id: $id }) {
            id
            name
            progress {
                me
            }
        }
    }
`
