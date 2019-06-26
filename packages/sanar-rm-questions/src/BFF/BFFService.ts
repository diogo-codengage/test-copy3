import { Speciality } from './speciality'
import { apolloClient } from './Apollo/RMGraphQLProvider'
import { GET_SPECIALTIES_WITH_TAGS } from './Apollo/Queries/get-filters'
import { questionSkip } from './Apollo/Mutations/questionSkip'
import { QuestionsInputFilter } from './QuestionsInputFilter'
import { getQuestionsQuery } from './Apollo/Queries/get-questions'
import { questionAnswer } from './Apollo/Mutations/questionAnswer'

const normalizeSpecialties = (list) => {

    list.forEach(e => e.tags = e.tags.data)
    const roots = list.filter(s => s.parent === null)
    roots.forEach(e => e.children = [])

    list.filter(s => s.parent !== null)
        .forEach(child => roots.find(r => r.value === child.parent.value).children.push(child))

    return roots
}

const getSpecialties = ():Promise<Speciality[]> => {
    return apolloClient.query({query: GET_SPECIALTIES_WITH_TAGS})
        .then(({data}) => normalizeSpecialties(data.specialties.data))
        .then( (values:[]) => values.sort(
            (o1:Speciality ,o2:Speciality) => (o1.label.localeCompare(o2.label)))
        )
        // .sort())
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
            query: getQuestionsQuery(params),
            fetchPolicy: 'no-cache'
    });
}

const confirmResponse = (variables: {alternativeId, correct, questionId}) => {
    return apolloClient.mutate({mutation: questionAnswer, variables })
}

export const BFFService = {
    getSpecialties,
    skipQuestion,
    loadMoreQuestions,
    confirmResponse,
}
