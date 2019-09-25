import gql from 'graphql-tag'

export const EDIT_CREDIT_CARD_MUTATION = gql`
    mutation EditUserCard(
        $holder_name: String!
        $card_expiration_month: Int
        $card_expiration_year: Int
        $card_number: String!
        $card_cvv: Int!
    ) {
        editUserCard(
            input: {
                holder_name: $holder_name
                card_expiration_month: $card_expiration_month
                card_expiration_year: $card_expiration_year
                card_number: $card_number
                card_cvv: $card_cvv
            }
        ) {
            id
            holder_name
            card_expiration_month
            card_expiration_year
            card_number
            card_cvv
        }
    }
`
