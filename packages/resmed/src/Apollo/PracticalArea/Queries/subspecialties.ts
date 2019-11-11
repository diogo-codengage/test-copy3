import gql from 'graphql-tag'

export interface ISubspecialty {
    value: string
    label: string
}

export interface ISubspecialtiesQuery {
    subSpecialties: ISubspecialty[]
}

export const GET_SUBSPECIALTIES = gql`
    {
        subSpecialties(where: {}) {
            value: id
            label: name
        }
    }
`
