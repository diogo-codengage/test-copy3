import gql from 'graphql-tag'

import { ICourse } from '../Queries/active-course'

export interface IUpdateActiveCourseResponse {
    updateActiveCourse: ICourse
}

export interface IUpdateActiveCourseVariables {
    courseId: string
}

export const UPDATE_ACTIVE_COURSE = gql`
    mutation UpdateActiveCourse($courseId: ID!) {
        updateActiveCourse(data: { courseId: $courseId }) {
            id
            name
            progress
            infos {
                title
                body
            }
            expireDate
            accessed
            images {
                original
            }
            lastAccessed {
                specialtyId
                subSpecialtyId
                collectionId
                lesson {
                    id
                    index
                }
                resource {
                    id
                    type
                    title
                }
            }
        }
    }
`
