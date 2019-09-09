import { Speciality } from './speciality'
import { apolloClient } from './Apollo/RMGraphQLProvider'
import { GET_INSTITUTIONS, GET_SPECIALTIES_WITH_TAGS, GET_CATEGORIES } from './Apollo/Queries/get-filters'
import { questionSkip } from './Apollo/Mutations/questionSkip'
import { QuestionsInputFilter } from './QuestionsInputFilter'
import { getQuestionsQuery } from './Apollo/Queries/get-questions'
import { questionAnswer } from './Apollo/Mutations/questionAnswer'
import { ISelectOption } from '../Components/ESSelect'
import capitalize from 'lodash/capitalize'

const normalizeSpecialties = (list) => {

    list.forEach(e => e.tags = e.tags.data)
    const roots = list.filter(s => s.parent === null)
    roots.forEach(e => e.children = [])

    list.filter(s => s.parent !== null)
        .forEach(child => roots.find(r => r.value === child.parent.value).children.push(child))

    return roots
}

const getSpecialties = (): Promise<Speciality[]> => {
    return apolloClient.query({ query: GET_SPECIALTIES_WITH_TAGS })
        .then(({ data }) => normalizeSpecialties(data.specialties.data))
        .then((values: []) => values.sort(
            (o1: Speciality, o2: Speciality) => (o1.label.localeCompare(o2.label)))
        )
}

const skipQuestion = (questionId) => {
    apolloClient.mutate({
        mutation: questionSkip,
        variables: { questionId }
    }).then(() => {
    })
}

const loadMoreQuestions = (params: QuestionsInputFilter) => {
    return apolloClient.query({
        query: getQuestionsQuery(params),
        fetchPolicy: 'no-cache'
    })
}

const confirmResponse = (variables: { alternativeId, correct, questionId }) => {
    return apolloClient.mutate({ mutation: questionAnswer, variables })
}

const getInstitutions = () => {
    return apolloClient.query({ query: GET_INSTITUTIONS})
        .then(({ data }) => data.institutions.data)
        .then((items: ISelectOption[]) => {
            return items.sort((o1, o2) => (o1.label.localeCompare(o2.label)))
        })
        .then( (items: ISelectOption[]) => {
            items.forEach(i => i.label = i.label.toLocaleUpperCase());
            return items;
        })
}


const getCategories = () => {
    return apolloClient.query({ query: GET_CATEGORIES})
        .then(({ data }) => data.categories.data)
        .then((items: ISelectOption[]) => {
            return items.sort((o1, o2) => (o1.label.localeCompare(o2.label)))
        })
        .then((items: ISelectOption[]) => {
            items.forEach(i => i.label = upper(i.label))
            return items;
        })
}

const upper = (str: string): string => {
    const spl = str.split("-")
    return spl.length > 1
      ? spl[0] + " - " + capitalize(spl[1].trim())
      : capitalize(spl[0].trim())
}

export const BFFService = {
    getSpecialties,
    getInstitutions,
    skipQuestion,
    loadMoreQuestions,
    confirmResponse,
    getCategories
}
