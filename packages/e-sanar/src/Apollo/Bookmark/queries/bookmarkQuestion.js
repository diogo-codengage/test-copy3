import gql from 'graphql-tag'

export const BOOKMARKED_QUESTIONS = gql`
    query BookmarkedQuestions($limit: Int, $skip: Int) {
        bookmarksQuestions(limit: $limit, skip: $skip) {
            count
            data {
                id
                question {
                    id
                    statement
                    alternatives {
                        data {
                            id
                            text
                            old_id
                            index
                        }
                    }
                    year
                    status
                    instituition {
                        id
                        name
                    }
                    difficulty {
                        name
                        level
                    }
                    images {
                        data {
                            id
                        }
                    }
                    bookmarked
                }
            }
        }
    }
`
