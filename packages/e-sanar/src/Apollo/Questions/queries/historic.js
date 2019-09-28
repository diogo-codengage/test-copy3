import gql from 'graphql-tag'

export const GET_HISTORIC_QUESTIONS = gql`
    query userAnswers($userId: ID!, $limit: Int, $skip: Int) {
        userAnswers(userId: $userId, limit: $limit, skip: $skip) {
            count
            data {
                id
                correct
                # alternatives that the user chose
                alternatives {
                    data {
                        id
                        text
                    }
                }
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
                            sized_images {
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
`
