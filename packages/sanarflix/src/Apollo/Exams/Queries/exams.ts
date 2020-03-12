import gql from 'graphql-tag'

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
    medUniversity: ISimpleData
}

export interface IExamQuery {
    quizExams: {
        data: IExam[]
        count: number
    }
}

export const GET_EXAMS = gql`
    query Exams(
            $limit: Int
            $skip: Int
            $medUniversityId: ID!
            $disciplineIds: [ID]
            $themeIds: [ID]
            $semesters: [YearSemester]
        ){
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
              questionsCount
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
