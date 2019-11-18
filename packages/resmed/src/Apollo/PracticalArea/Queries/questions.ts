import gql from 'graphql-tag'

export const GET_QUESTIONS = gql`
    query Questions($limit: Float!) {
        questions(limit: $limit) {
            totalCount
            limit
            skip
            items {
                id
                statement
                year
                institution {
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
            }
        }
    }
`
