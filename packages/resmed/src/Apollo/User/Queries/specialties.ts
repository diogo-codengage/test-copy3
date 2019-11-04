import gql from 'graphql-tag'

interface IProgress {
    all: number
    me: number
}
export interface ISpecialties {
    id: string
    name: string
    progress: IProgress
    hasSubSpecialties: boolean
    image: string
}

// progress {
//     all
//     me
// }

export const GET_SPECIALTIES = gql`
    query Specialties($courseId: ID) {
        specialties(where: { courseId: $courseId }) {
            id
            name
            hasSubSpecialties
            image
        }
    }
`
