import gql from 'graphql-tag'

export const GET_QUESTIONS = gql`
    query {
        questions {
            data {
                id
                statement
                year
                instituition {
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
`
