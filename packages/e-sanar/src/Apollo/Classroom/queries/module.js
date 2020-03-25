import gql from 'graphql-tag'

export const GET_MODULE = gql`
    query Module($id: ID!, $enrollmentId: ID!) {
        module(id: $id, enrollmentId: $enrollmentId) {
            id
            name
            slug
            index
            duration
            cover_picture_url
            progress {
                done
                total
                # status
            }
            level_contents {
                data {
                    index
                    display
                    resource_type
                    video {
                        id
                        title
                        durationInSeconds
                        progress {
                            id
                            percentage
                            timeInSeconds
                        }
                        thumbnails {
                            small
                            medium
                            large
                            original
                        }
                        providers {
                            data {
                                code
                                videoId
                                videoUrl
                                files {
                                    smil {
                                        filename
                                        mime_type
                                        size
                                        url
                                    }
                                }
                            }
                        }
                    }
                    document {
                        id
                        title
                        progress {
                            id
                            percentage
                        }
                        file {
                            filename
                            mime_type
                            url
                            size
                        }
                    }
                    quiz {
                        id
                        title
                        progress {
                            id
                            percentage
                        }
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
                                    bookmarked
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
    }
`
