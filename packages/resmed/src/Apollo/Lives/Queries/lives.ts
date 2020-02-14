import gql from 'graphql-tag'

interface IProfessor {
    id: string
    name: string
    profilePicture: string
    academicTraining: string
    linkedInLink: string
}

export interface ILive {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
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
    query Lives($start: Date, $end: Date, $order: Order, $skip: Int) {
        lives(
            where: { start: $start, end: $end }
            order: $order
            limit: 12
            skip: $skip
        ) {
            items {
                id
                title
                description
                startDate
                endDate
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
