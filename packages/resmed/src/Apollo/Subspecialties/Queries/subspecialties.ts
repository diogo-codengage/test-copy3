import gql from 'graphql-tag'

interface IProgress {
    all: number
    me: number
}
export interface ISubspecialty {
    id: string
    name: string
    progress: IProgress
}

export const GET_SUBSPECIALTIES = gql`
    query SubSpecialties($parentId: ID!) {
        subSpecialties(where: { parentId: $parentId }) {
            id
            name
        }
    }
`
