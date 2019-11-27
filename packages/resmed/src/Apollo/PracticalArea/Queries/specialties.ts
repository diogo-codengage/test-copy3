import gql from 'graphql-tag'

export interface ISpecialty {
    value: string
    label: string
}

export interface IISpecialtiesQuery {
    specialties: ISpecialty[]
}

export const GET_SPECIALTIES = gql`
    query Specialties($courseId: ID) {
        specialties(where: { courseId: $courseId }) {
            value: id
            label: name
        }
    }
`
