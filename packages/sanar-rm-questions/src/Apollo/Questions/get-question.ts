import { gql } from 'apollo-boost'

export const GET_QUESTION = gql`
    {
        questions(limit:3, random:true){
            data {
                id,
                statement,
                year,
                type,
                alternatives {
                    data {
                        id,
                        text,
                        correct
                    }
                }
                institution {
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
