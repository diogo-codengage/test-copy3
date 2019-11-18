import gql from 'graphql-tag'

interface IProgress {
    all: number
}

export interface ISpecialty {
    id: string
    name: string
    progress: IProgress
}

export const GET_SPECIALTY = gql`
    query Specialties($id: ID!) {
        specialty(where: { id: $id }) {
            id
            name
            progress {
                me
            }
        }
    }
`
