import { gql } from 'apollo-boost'
import { QuestionsInputFilter } from '../../QuestionsInputFilter'

export const getQuestionsQuery = (filter: QuestionsInputFilter) => {
    const where:any = {};
    let state:string = '';

    if(filter.specialtiesIds.length > 0) {
        where.specialty_ids = {
            inq : filter.specialtiesIds
        }
    }

    if(filter.tagsIds.length > 0) {
        where.tag_ids = filter.tagsIds
    }

    if(filter.institutionsIds.length > 0){
        where.institution_id = {
            inq : filter.institutionsIds
        }
    }

    if(filter.years.length > 0) {
        where.year = {
            inq: filter.years.map(parseInt)
        }
    }

    if (filter.state) {
        state = filter.state
    }

    if(filter.isCommentedByExpert) {
        where.isCommentedByExpert = true;
    }

    const whereFilter = ` ,where: "${JSON.stringify(where).replace(/"/g, '\\"') }" `

    const queryWithParams = `
        {
            questions(limit: 10, random:true ${whereFilter}, state: "${state}"){
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
    return gql`${queryWithParams}`
}

