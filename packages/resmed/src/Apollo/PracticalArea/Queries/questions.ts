import gql from 'graphql-tag'

interface IInstitution {
    id: string
    name: string
}

interface IAlternative {
    id: string
    text: string
}

interface IUrl {
    url: string
}

interface ISizes {
    id: string
    small: IUrl
    medium: IUrl
    large: IUrl
}

interface IImage {
    id: string
    data: {
        sized_images: ISizes
    }
}

export interface IQuestion {
    id: string
    statement: string
    year: string
    institution: IInstitution
    alternatives: {
        data: IAlternative[]
    }
    images: IImage
}

export interface IQuestions {
    totalCount: number
    limit: number
    skip: number
    items: IQuestion[]
}

export interface IQuestionsQuery {
    questions: IQuestions
}

export const GET_QUESTIONS = gql`
    query Questions(
        $limit: Float!
        $categoriesIds: [ID!]
        $specialtiesIds: [ID!]
        $subSpecialtiesIds: [ID!]
        $lessonsIds: [ID!]
        $institutionId: ID
        $year: Int
        $isCommentedByExpert: Boolean
        $withImage: Boolean
        $state: BRStates
    ) {
        questions(
            limit: $limit
            where: {
                categoriesIds: $categoriesIds
                specialtiesIds: $specialtiesIds
                subSpecialtiesIds: $subSpecialtiesIds
                lessonsIds: $lessonsIds
                institutionId: $institutionId
                year: $year
                isCommentedByExpert: $isCommentedByExpert
                withImage: $withImage
                state: $state
            }
        ) {
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
                                url
                            }
                            medium {
                                url
                            }
                            large {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`
