import { gql } from 'apollo-boost'
import { QuestionsInputFilter } from '../../QuestionsInputFilter'

export const getQuestionsQuery = (filter: QuestionsInputFilter) => {
    const where:any = {};

    if(filter.specialtiesIds.length > 0) {
        where.specialties = filter.specialtiesIds
    }

    if(filter.tagsIds.length > 0) {
        where.tags = filter.tagsIds
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
    if(filter.isCommentedByExpert) {
        where.isCommentedByExpert = true;
    }

    const whereFilter = ` ,where: "${JSON.stringify(where).replace(/"/g, '\\"') }" `

    const queryWithParams = `
        {
            questions(limit: 10, random:true ${whereFilter}){
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

