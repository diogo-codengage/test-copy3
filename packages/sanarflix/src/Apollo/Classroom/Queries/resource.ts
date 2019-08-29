import gql from 'graphql-tag'

export interface IResource {
    id: string
    name: string
}

export const GET_RESOURCE = gql`
    query Resource($themeId: ID!, $resourceId: ID!) {
        resource(themeId: $themeId, resourceId: $resourceId) {
            id
            resource_type
            type
            title
            video {
                id
                title
                durationInSeconds
                bookmarked
                progress {
                    id
                    percentage
                    timeInSeconds
                }
                thumbnails {
                    small
                    medium
                    large
                }
                providers {
                    data {
                        code
                        files {
                            smil {
                                url
                            }
                        }
                    }
                }
            }
            document {
                id
                title
                bookmarked
                file {
                    url
                }
            }
        }
    }
`
