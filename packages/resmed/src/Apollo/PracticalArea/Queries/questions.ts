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
        id: string
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

export interface IQuizQuery {
    totalCount: number
    limit: number
    skip: number
    items: IQuestion
}

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
                    id
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
