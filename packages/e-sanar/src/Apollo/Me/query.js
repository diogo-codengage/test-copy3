import gql from 'graphql-tag'

export const GET_ME = gql`
    {
        me {
            id
            name
            enrollments {
                id
                contract
                progress_percentage
                performance_indicators
                course {
                    id
                    name
                    status
                    knowledge_area
                    cover_picture
                    professors {
                        id
                        name
                    }
                    comments {
                        id
                        text
                        answers
                        user {
                            id
                            name
                        }
                    }
                    lives {
                        id
                        title
                        slug
                        link
                        description
                        status
                        online
                        release_date
                        professors {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`
