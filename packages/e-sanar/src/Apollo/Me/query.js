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
                    knowledge_area
                    cover_pictures
                    comments {
                        id
                        text
                        answers
                        user {
                            id
                            name
                            profile_picture
                        }
                    }
                    lives {
                        id
                        title
                        description
                        release_date
                        link
                        professor {
                            id
                            name
                            profile_picture
                        }
                    }
                }
            }
        }
    }
`
