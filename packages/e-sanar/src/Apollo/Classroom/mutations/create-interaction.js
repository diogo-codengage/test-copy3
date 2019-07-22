import gql from 'graphql-tag'

export const CREATE_INTERACTION = gql`
    mutation CreateInteraction(
        $resourceId: String!
        $resourceType: String!
        $interaction: InteractionType!
    ) {
        createInteraction(
            input: {
                resource_id: $resourceId
                resource_type: $resourceType
                interaction: $interaction
            }
        ) {
            id: resource_id
            resource_type
            likes_count
            dislikes_count
        }
    }
`
