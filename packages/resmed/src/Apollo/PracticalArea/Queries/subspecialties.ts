import gql from 'graphql-tag'

export interface ISubspecialty {
    value: string
    label: string
}

export interface ISubspecialtiesQuery {
    subSpecialties: ISubspecialty[]
}

export const GET_SUBSPECIALTIES = gql`
    query SubSpecialties {
        subSpecialties: contentSubSpecialties {
            value: id
            label: name
        }
    }
`
