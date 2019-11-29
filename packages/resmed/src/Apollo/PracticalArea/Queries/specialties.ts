import gql from 'graphql-tag'

export interface ISpecialty {
    value: string
    label: string
}

export interface IISpecialtiesQuery {
    specialties: ISpecialty[]
}

export const GET_SPECIALTIES = gql`
    query Specialties {
        specialties {
            value: id
            label: name
        }
    }
`
