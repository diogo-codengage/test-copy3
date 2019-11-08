import gql from 'graphql-tag'

const isRandom = /true/i.test(process.env.REACT_APP_RANDOM_QUESTIONS || 'true')

export const GET_QUESTIONS = gql`
    query Questions(
        $courseIds: [ID]
        $levelIds: [ID]
        $limit: Int
    ) {
        questions(
            courseIds: $courseIds
            levelIds: $levelIds
            limit: $limit
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
