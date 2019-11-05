import gql from 'graphql-tag'

interface IProgress {
    all: number
    me: number
}
export interface ISubspecialties {
    id: string
    name: string
    progress: IProgress
}

export const GET_SUBSPECIALTIES = gql`
    query SubSpecialty($parentId: ID!) {
        subSpecialty(where: { parentId: $parentId }) {
            id
            name
            progress {
                all
                me
            }
        }
    }
`
