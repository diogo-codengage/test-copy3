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

interface IQuestion {
    id: string
    statement: string
    year: string
    institution: IInstitution
    alternatives: {
        data: IAlternative[]
    }
    images: IImage
}

export interface IQuiz {
    id: string
    title: string
    questions: IQuestion[]
}

export interface IQuizQuery {
    quiz: IQuiz
}

export const GET_QUIZ = gql`
    query Quiz($id: ID!) {
        quiz(where: { id: $id }) {
            id
            title
            questions {
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
