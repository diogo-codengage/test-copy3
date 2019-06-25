import { gql } from 'apollo-boost'
import { QuestionsInputFilter } from './QuestionsInputFilter'

export const getQuestionsQuery = (filter: QuestionsInputFilter) => {

    const where:any = {};

    if(filter.isCommentedByExpert) {
        where.isCommentedByExpert = true;
    }

    if(filter.year) {
        where.year = filter.year
    }

    const whereFilter = ` ,where: "${JSON.stringify(where).replace(/"/g, '\\"') }" `

    const queryWithParams = `
        {
            questions(limit:3, random:true ${whereFilter}){
                data {
                    id,
                    statement,
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

                    comments{
                        data {
                            id
                            text
                            user{
                                id
                                name
                            }
                            labels
                        }
                    }

                    tags {
                        data {
                            name
                        }
                    }
                }
            }
        }
`
    // console.log({queryWithParams})
    return gql`${queryWithParams}`
}
