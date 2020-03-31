import gql from 'graphql-tag'
import { IMedUniversity } from './medUniversities'

export interface IQuizUniversitiesQuery {
    quizMedUniversities: {
        data: IMedUniversity[]
    }
}

export const GET_QUIZ_UNIVERSITIES = gql`
    {
        quizMedUniversities {
            data {
               id
               name
            }
        }
    }
`
