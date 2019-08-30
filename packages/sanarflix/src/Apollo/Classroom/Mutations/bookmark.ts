import gql from 'graphql-tag'

interface ResponseBookmark {
    id: string
    bookmarked: boolean
}

export interface IBookmark {
    createBookmarks: {
        document: ResponseBookmark
        video: ResponseBookmark
        question: ResponseBookmark
    }
}

export const CREATE_BOOKMARK = gql`
    mutation CreateBookmarks(
        $resourceId: String!
        $resourceType: ResourceType!
    ) {
        createBookmarks(
            input: { resource_id: $resourceId, resource_type: $resourceType }
        ) {
            document {
                id
                bookmarked
            }
            video {
                id
                bookmarked
            }
            question {
                id
                bookmarked
            }
        }
    }
`
