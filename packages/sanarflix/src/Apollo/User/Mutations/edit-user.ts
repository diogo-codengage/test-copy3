import gql from 'graphql-tag'

export const EDIT_USER_MUTATION = gql`
    mutation EditUser(
        $name: String!
        $cpf: String
        $phone_number: String
        $college: String
        $period: String
        $address: AddressInput
    ) {
        editUser(
            input: {
                name: $name
                cpf: $cpf
                phone_number: $phone_number
                college: $college
                period: $period
                address: $address
            }
        ) {
            id
            name
            email
            profile_picture
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
        }
    }
`