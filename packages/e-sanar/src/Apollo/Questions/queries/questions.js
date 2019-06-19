import gql from 'graphql-tag'

export const GET_QUESTIONS = gql`
    query Questions(
        $courseIds: [ID]
        $tagIds: [ID]
        $levelIds: [ID]
        $boardIds: [ID]
        $examIds: [ID]
        $years: [Int]
        $limit: Int
    ) {
        questions(
            courseIds: $courseIds
            tagIds: $tagIds
            levelIds: $levelIds
            boardIds: $boardIds
            examIds: $examIds
            years: $years
            limit: $limit
        ) {
            count
            data {
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
`
