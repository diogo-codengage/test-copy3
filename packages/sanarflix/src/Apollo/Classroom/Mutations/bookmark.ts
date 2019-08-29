import gql from 'graphql-tag'

export interface IResource {
    id: string
    name: string
}

export const CREATE_BOOKMARK = gql`
    mutation CreateBookmarks(
        $resourceId: String!
        $resourceType: ResourceType!
    ) {
        createBookmarks(
            input: { resource_id: $resourceId, resource_type: $resourceType }
        ) {
            bookmark {
                id
                resource_type
                resource_id
                owner_id
            }
        }
    }
`
