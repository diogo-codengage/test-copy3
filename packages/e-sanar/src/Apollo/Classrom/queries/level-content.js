import gql from 'graphql-tag'

export const GET_LEVEL_CONTENT = gql`
    query levelContent($levelId: String!) {
        levelContent(levelId: $levelId) {
            data {
                index
                resource_type
                video {
                    id
                    title
                    durationInSeconds
                    thumbnails {
                        small {
                            url
                        }
                        medium {
                            url
                        }
                    }
                    providers {
                        data {
                            code
                            videoId
                            videoUrl
                            # files {
                            #     smil {
                            #         id
                            #         filename
                            #         mime_type
                            #         size
                            #         url
                            #     }
                            # }
                        }
                    }
                }
                download {
                    id
                    title
                    file {
                        id
                        mime_type
                        url
                        size
                    }
                }
                quiz {
                    title
                    questionItems {
                        data {
                            question {
                                id
                                statement
                                year
                                institution: instituition {
                                    id
                                    name
                                }
                                alternatives {
                                    data {
                                        id
                                        text
                                    }
                                }
                                images {
                                    data {
                                        id
                                        sizedImages {
                                            id
                                            small {
                                                id
                                                filename
                                                url
                                                height
                                                width
                                            }
                                            medium {
                                                id
                                                filename
                                                url
                                                height
                                                width
                                            }
                                            large {
                                                id
                                                filename
                                                url
                                                height
                                                width
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`
