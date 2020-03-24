import gql from 'graphql-tag'

export interface IUniversity {
    value: string
    label: string
}

export interface IQuizUniversitiesQuery {
    quizMedUniversities: {
        data: IUniversity[]
    }
}

export const GET_QUIZ_UNIVERSITIES = gql`
    {
        quizMedUniversities {
            data {
                value: id
                label: name
            }
        }
    }
`
