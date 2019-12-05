import gql from 'graphql-tag'

export interface ISubspecialty {
    value: string
    label: string
}

export interface ISubspecialtiesQuery {
    subSpecialties: {
        items: ISubspecialty[]
    }
}

export const GET_SUBSPECIALTIES = gql`
    query SubSpecialties {
        subSpecialties(where: { status: active }) {
            items {
                value: id
                label: name
            }
        }
    }
`
