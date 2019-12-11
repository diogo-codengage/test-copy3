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
    image: string
    professor: IProfessor
}

export interface ILivesQuery {
    lives: {
        items: ILive[]
        totalCount: number
    }
}

export const GET_LIVES = gql`
    query Lives($start: Date, $end: Date) {
        lives(where: { start: $start, end: $end }) {
            items {
                id
                title
                description
                date
                image
                youtubeId
                professor: facilitedBy {
                    id
                    name
                    profilePicture
                }
            }
            totalCount
        }
    }
`
