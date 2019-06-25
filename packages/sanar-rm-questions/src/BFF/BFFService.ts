import { GET_SPECIALTIES, GET_TAGS } from './Apollo/Questions/get-filters'
import { apolloClient } from './Apollo/RMGraphQLProvider'
import { Tag } from './Apollo/Questions/tag'
import { Speciality } from './Apollo/Questions/speciality'
import { questionSkip } from './Apollo/Questions/questionSkip'
import { getQuestionsQuery } from './Apollo/Questions/get-questions'
import { QuestionsInputFilter } from './Apollo/Questions/QuestionsInputFilter'
import { questionAnswer } from './Apollo/Questions/questionAnswer'

interface HasValue {
    value: string,
}
const distinctFilter = (value:HasValue, index: number, arr: HasValue[]): boolean => {
    const items =  arr.filter(v => v.value === value.value);
    if (items.length > 1){
        return (items[0] === value)
    }
    return true;
}

const normalizeSpecialties = (list) => {

    list.forEach(e => e.tags = e.tags.data)
    const roots = list.filter(s => s.parent === null)
    roots.forEach(e => e.children = [])

    list.filter(s => s.parent !== null)
        .forEach(child => roots.find(r => r.value === child.parent.value).children.push(child))

    return roots
}

const getSpecialties = ():Promise<Speciality[]> => {
    return apolloClient.query({query: GET_SPECIALTIES})
        .then(({data}) => normalizeSpecialties(data.specialties.data))
        .then( (values:[]) => values.sort(
            (o1:Speciality ,o2:Speciality) => (o1.label.localeCompare(o2.label)))
        )
        // .sort())
        // .then( (values:[]) => values.filter(distinctFilter))
}

const getTags = async ():Promise<Tag[]> => {
    return apolloClient.query({query: GET_SPECIALTIES})
        .then(({data}) => data.tags.data)
        .then( (values:[]) => values.sort(
            (o1:Tag ,o2:Tag) => (o1.label.localeCompare(o2.label)))
        )
        // .then( (values:[]) => values.filter(distinctFilter))
}

const skipQuestion = (questionId) =>{
    apolloClient.mutate({
        mutation: questionSkip,
        variables: { questionId },
    }).then(() => {})
}

const loadMoreQuestions = (params: QuestionsInputFilter) => {
    return  apolloClient.query({
            query: getQuestionsQuery(params) ,
            fetchPolicy: 'no-cache'
    });
}

const confirmResponse = (variables: {alternativeId, correct, questionId}) => {
    return apolloClient.mutate({mutation: questionAnswer, variables })
}

export const BFFService = {
    getSpecialties,
    getTags,
    skipQuestion,
    loadMoreQuestions,
    confirmResponse,
}
