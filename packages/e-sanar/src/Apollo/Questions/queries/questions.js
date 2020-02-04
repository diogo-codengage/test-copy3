import gql from 'graphql-tag'

const isRandom = (/true/i).test(process.env.REACT_APP_RANDOM_QUESTIONS)

export const GET_QUESTIONS = gql`
    query Questions(
        $courseIds: [ID]
        $tagIds: [ID]
        $levelIds: [ID]
        $boardIds: [ID]
        $examIds: [ID]
        $years: [Int]
        $limit: Int
        $answeredByUser: String
        $notAnsweredByUser: String
        $isCommentedByExpert: Boolean
    ) {
        questions(
            courseIds: $courseIds
            tagIds: $tagIds
            levelIds: $levelIds
            boardIds: $boardIds
            examIds: $examIds
            years: $years
            limit: $limit
            answeredByUser: $answeredByUser
            notAnsweredByUser: $notAnsweredByUser
            isCommentedByExpert: $isCommentedByExpert
            random: ${isRandom}
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
                bookmarked
                images {
                    data {
                        id
                        sized_images: sizedImages {
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
