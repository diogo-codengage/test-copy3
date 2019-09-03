import gql from 'graphql-tag'

export interface ITheme {
    id: string
    name: string
}

export const GET_THEME = gql`
    query Theme($id: ID!) {
        theme(id: $id) {
            id
            name
            themeContents {
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
    }
`
