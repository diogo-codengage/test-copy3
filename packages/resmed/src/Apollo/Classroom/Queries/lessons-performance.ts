import gql from 'graphql-tag'

export interface IlessonPerformance {
    id: string
    title: string
    total: number
    corrects: number
    quiz: {
        id: string
        questions: Array<{
            id: string
        }>
    }
}

export interface IlessonPerformanceQuery {
    lessonPerformance: IlessonPerformance[]
}

export const GET_LESSON_PERFORMANCE = gql`
    query LessonPerformance($lessonId: ID!) {
        lessonPerformance(where: { lessonId: $lessonId }) {
            id
            title: clickerName
            total: totalQuestions
            corrects: totalCorrect
            quiz {
                id
                questions {
                    id
                }
            }
        }
    }
`
