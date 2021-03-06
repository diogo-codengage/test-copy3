import gql from 'graphql-tag'

export const CHANGE_COURSE = gql`
    mutation SetLastEnrollmentAccessed($enrollmentId: ID!) {
        setLastEnrollmentAccessed(input: { enrollment_id: $enrollmentId }) {
            id
            contract
            ranking {
                position
                points
            }
            progress_percentage
            expires_at
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
                cover_picture_url
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
`
