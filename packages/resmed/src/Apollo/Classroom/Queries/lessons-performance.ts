import gql from 'graphql-tag'

export interface IlessonPerformance {
    clickerName: string
    totalQuestions: number
    totalcorrect: number
}

export interface IlessonPerformanceQuery {
    lessonPerformance: {
        items: IlessonPerformance
    }
}

export const GET_LESSON_PERFORMANCE = gql`
    query LessonPerformance($lessonId: ID!) {
        lessonPerformance(where: { lessonId: $lessonId }) {
            items {
                title: clickerName
                total: totalQuestions
                corrects: totalCorrect
            }
        }
    }
`
