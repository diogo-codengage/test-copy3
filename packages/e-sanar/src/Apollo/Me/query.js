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
                bookmarks {
                    data {
                        resource_type
                        resource {
                            title
                            path
                        }
                    }
                    count
                }
                performance {
                    interaction {
                        value
                        status
                    }
                    commitment {
                        value
                        status
                    }
                    uniformity {
                        value
                        status
                    }
                    progress {
                        done
                        total
                    }
                    tests {
                        done
                        total
                    }
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
                        linkedin
                        resume
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
