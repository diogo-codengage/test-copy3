import gql from 'graphql-tag'

export const UPDATE_COURSE_ACCESSED = gql`
    mutation UpdateCourseProgressAccess(
        $data: CourseAccessedUpdateInput!
    ) {
        updateCourseProgressAccess(data: $data) {
            accessed
        }
    }
`
