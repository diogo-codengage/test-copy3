import { gql } from 'apollo-boost'

export const GET_QUESTION = gql`
    {
        questions(limit:1, random:true){
            data {
                id,
                uuid,
                old_id,
                statement,
                type,
                year,
                status,
                institution{
                    name,
                    state
                },
                answers {
                    data {
                        id
                    }
                },
                tags {
                    data {
                        name
                    }
                }
            }
        }
    }
`
