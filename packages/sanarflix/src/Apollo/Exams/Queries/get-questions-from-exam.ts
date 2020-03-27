import gql from 'graphql-tag'

interface IExamQuestionAlternativesAlternative {
  id: string
  text: string
}

interface IExamQuestionAlternatives {
  data: IExamQuestionAlternativesAlternative[]
}

export interface IExamQuestion {
  id: string
  statment: string
  year,
  alternatives: IExamQuestionAlternatives
}

export interface IExamQuestionQuery {
  questions: {
    count: number
    data: IExamQuestion[]
  }
}

export const GET_EXAM_QUESTIONS = gql`
    query Questions($examIds: [ID]) {
      questions(examIds: $examIds, limit: 9999) {
            count
            data {
                id
                statement
                year
                alternatives {
                  data {
                    id
                    text
                  }
                }
            }
        }
    }
`
