import gql from 'graphql-tag'

export const GET_ME = gql`
    {
        me {
            id
            name
            profile_picture
            enrollments {
                id
                contract
                progress_percentage
                saved_contents {
                    resource_type
                    resource {
                        title
                        path
                    }
                }
                performance_indicators {
                    commitment
                    uniformity
                    progress {
                        done
                        total
                    }
                    tests {
                        done
                        total
                    }
                    interaction
                }
                course {
                    id
                    name
                    icon
                    status
                    knowledge_area
                    cover_picture
                    professors {
                        id
                        name
                        profile_picture
                    }
                    comments {
                        id
                        text
                        created_at
                        answers
                        user {
                            id
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
                            profile_picture
                        }
                    }
                }
            }
        }
    }
`
