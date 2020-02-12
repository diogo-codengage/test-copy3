import gql from 'graphql-tag'
import { IMedUniversity } from './medUniversities'

export interface ISimpleData {
    id: string
    name: string
}

export interface IExam {
    id: string
    title: string
    year: string
    semester: string
    questionsCount: number
    discipline: ISimpleData
    theme: ISimpleData
    medUniversity: IMedUniversity
}

export interface IExamQuery {
    exams: IExam[]
}

export const GET_EXAMS = gql`
    {
        quizExams(
            limit: $limit
            skip: $skip
            medUniversityId: $medUniversityId
            disciplineIds: $disciplineIds
            themeIds: $themeIds
            semesters: $semesters
        ) {
            data {
              id
              title
              year
              semester
              discipline {
                id
                name
              }
              theme {
                id
                name
              }
              medUniversity {
                id
                name
              }
            }
            count
        }
    }
`
