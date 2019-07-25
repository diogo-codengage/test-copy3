import gql from 'graphql-tag'

export const GET_ME = gql`
    {
        me {
            id
            name
            email
            profile_picture
            enrollments {
                id
                contract
                ranking {
                    position
                    points
                }
                next_module {
                    id
                    name
                    slug
                    index
                    durantion
                    cover_picture_url
                    progress {
                        done
                        total
                    }
                }
                performance {
                    interaction {
                        id
                        # value
                        # status
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
                    professors {
                        id
                        name
                        profile_picture
                        linkedin
                        resume
                    }
                    lives {
                        id
                        title
                        slug
                        link
                        description
                        status
                        online
                        scheduled
                        start_at
                        professors {
                            id
                            name
                            profile_picture
                            linkedin
                            resume
                        }
                    }
                }
            }
        }
    }
`
