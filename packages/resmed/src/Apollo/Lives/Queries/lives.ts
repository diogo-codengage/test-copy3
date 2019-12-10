import gql from 'graphql-tag'

interface IProfessor {
    id: string
    name: string
    profilePicture: string
}

export interface ILive {
    id: string
    title: string
    description: string
    date: string
    youtubeId: string
    profressor: IProfessor
}

export interface ILivesQuery {
    lives: ILive[]
}

export const GET_LIVES = gql`
    query Lives($start: Date, $end: Date) {
        lives(where: { start: $start, end: $end }) {
            id
            title
            description
            date
            youtubeId
            profressor: facilitedBy {
                id
                name
                profilePicture
            }
        }
    }
`
