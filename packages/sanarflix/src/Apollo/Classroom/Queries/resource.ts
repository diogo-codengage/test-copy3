import gql from 'graphql-tag'

export type IType =
    | 'resume'
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'
export interface IResource {
    resource: {
        id: string
        resource_type: 'Video' | 'Question' | 'Document'
        type: IType
        title: string
        course: {
            id: string
            name: string
        }
        video: {
            id: string
            title: string
            durationInSeconds: number
            bookmarked: boolean
            progress: {
                id: string
                percentage: number
                timeInSeconds: number
            }
            thumbnails: {
                large: string
            }
            providers: {
                data: Array<{
                    code: string
                    files: {
                        smil: {
                            url: string
                        }
                    }
                }>
            }
        }
        document: {
            id: string
            title: string
            bookmarked: boolean
            file: {
                url: string
            }
        }
    }
}

export const GET_RESOURCE = gql`
    query Resource($themeId: ID!, $resourceId: ID!) {
        resource(themeId: $themeId, resourceId: $resourceId) {
            id
            resource_type
            type
            title
            course {
                id
                name
            }
            video {
                id
                title
                durationInSeconds
                bookmarked
                # progress {
                #     id
                #     percentage
                #     timeInSeconds
                # }
                thumbnails {
                    small
                    medium
                    large
                }
                rating {
                    id
                    rating {
                        value
                    }
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
