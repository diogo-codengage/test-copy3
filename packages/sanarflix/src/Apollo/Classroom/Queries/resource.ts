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
    query Resource($themeId: ID!, $resourceId: ID!, $courseId: ID!) {
        resource(
            themeId: $themeId
            resourceId: $resourceId
            courseId: $courseId
        ) {
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
            quiz {
                id
                title
                questionItems {
                    data {
                        question {
                            id
                            bookmarked
                            statement
                            images {
                                data {
                                    id
                                    sized_images: sizedImages {
                                        id
                                        small {
                                            filename
                                            url
                                            height
                                            width
                                        }
                                        medium {
                                            filename
                                            url
                                            height
                                            width
                                        }
                                        large {
                                            filename
                                            url
                                            height
                                            width
                                        }
                                    }
                                }
                            }
                            alternatives {
                                data {
                                    id
                                    text
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
