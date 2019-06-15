import { gql } from 'apollo-boost'
import { QuestionsInputFilter } from '../QuestionsInputFilter'

export const getQuestionsQuery = (filter: QuestionsInputFilter) => {

    const where = {};

    if(filter.isCommentedByExpert) {
        where['isCommentedByExpert'] = true;
    }

    if(Object.keys(where).length > 0){

    }

    const whereFilter = ` ,where: "${JSON.stringify(where)}" `

    return gql`
        {
            questions(limit:3, random:true ${whereFilter}){
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
}
