import { gql } from 'apollo-boost'
import { QuestionsInputFilter } from '../../QuestionsInputFilter'

export const getQuestionsQuery = (filter: QuestionsInputFilter) => {

    const where:any = {};

    //institution_id: { inq: [] as string[] },

    if(filter.specialtiesIds.length > 0) {
        where.specialty_ids = {
            inq : filter.specialtiesIds
        }
    }

    if(filter.tagsIds.length > 0) {
        where.tag_ids = {
            inq : filter.tagsIds
        }
    }

    if(filter.states.length > 0){
        where['institution_states'] = {
            inq : filter.states
        }
    }

    if(filter.years.length > 0) {
        where.year = {
            inq: filter.years.map(parseInt)
        }
    }
    if(filter.isCommentedByExpert) {
        where.isCommentedByExpert = true;
    }

    console.log({where})
    const whereFilter = ` ,where: "${JSON.stringify(where).replace(/"/g, '\\"') }" `

    const queryWithParams = `
        {
            questions(limit:3, random:true ${whereFilter}){
                data {
                    id,
                    statement,
                    type,
                    year,
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
