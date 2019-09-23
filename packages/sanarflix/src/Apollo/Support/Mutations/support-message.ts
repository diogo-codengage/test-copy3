import gql from 'graphql-tag'

export const SUPPORT_MESSAGE_MUTATION = gql`
    mutation SupportMessage(
        $email: String!
        $message: String!
        $allow_sanar_contact: Boolean
    ) {
        supportMessage(
            input: {
                email: $email
                message: $message
                allow_sanar_contact: $allow_sanar_contact
            }
        ) {
            status
        }
    }
`
