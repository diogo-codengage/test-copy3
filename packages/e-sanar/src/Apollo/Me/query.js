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
                        status
                    }
                    tests {
                        done
                        total
                        status
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
                        data {
                            id
                            text
                            created_at
                            answers
                            user {
                                name
                                id
                                profile_picture
                            }
                        }
                        count
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
