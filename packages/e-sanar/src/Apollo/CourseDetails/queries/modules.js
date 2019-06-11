import gql from 'graphql-tag'

export const GET_MODULES = gql`
    query modules($courseId: ID, $limit: Int, $skip: Int, $where: String) {
        modules(
            courseId: $courseId
            limit: $limit
            skip: $skip
            where: $where
        ) {
            data {
                id
                name
                slug
                index
                durantion
                cover_picture
                progress {
                    done
                    total
                    status
                }
            }
            count
        }
    }
`
