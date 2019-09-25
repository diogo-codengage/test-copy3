import gql from 'graphql-tag'

interface IAddress {
    id: string
    postal_code: string
    address: string
    district: string
    complement: string
    state_id: string
    city_name: string
}

export interface IPlan {
    id: string
    description: string
    payment_currency: string
    payment_value: string
    payment_frequency: 'month' | 'semiannual' | 'yearly'
}

export interface ICreditCard {
    id: string
    holder_name: string
    card_expiration_month: number
    card_expiration_year: number
    card_number: string
    card_cvv: number
}

export interface IMe {
    id: string
    name: string
    profile_picture: string
    email: string
    status: 'active' | 'inactive'
    cpf: string
    phone_number: string
    college: string
    period: string
    address: IAddress
    plan: IPlan
    card: ICreditCard
}

export const GET_ME = gql`
    {
        me {
            id
            name
            email
            profile_picture
            status
            cpf
            phone_number
            college
            period
            address {
                id
                postal_code
                address
                district
                complement
                state_id
                city_name
            }
            plan {
                id
                description
                payment_currency
                payment_value
                payment_frequency
            }
            card {
                id
                holder_name
                card_expiration_month
                card_expiration_year
                card_number
                card_cvv
            }
        }
    }
`
