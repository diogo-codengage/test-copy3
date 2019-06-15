import React, { useContext } from 'react'
import { FilterTemplate } from './FilterTemplate'
import { GET_FILTERS } from '../../../Apollo/Questions/get-filters'
import { useQuestionsContext } from '../QuestionsContext'
import { ApolloContext } from 'react-apollo'

const normalizeSpecialties = (list) => {

    list.forEach(e => e.tags = e.tags.data)
    const roots = list.filter(s => s.parent === null)
    roots.forEach(e => e.children = [])

    list.filter(s => s.parent !== null)
        .forEach(child => roots.find(r => r.value === child.parent.value).children.push(child))

    return roots
}

export const Filter = () => {
    const questionsCtx = useQuestionsContext()
    const { client } = useContext(ApolloContext)
    const hasSpecialties = !!questionsCtx.specialties

    if (hasSpecialties) {
        return <FilterTemplate/>
    } else {
        questionsCtx.setLoading(true)
        client.query({ query: GET_FILTERS }).then(({ data }) => {
            questionsCtx.setSpecialties(normalizeSpecialties(data.specialties.data))
            questionsCtx.setLoading(false)
        })
        return <></>
    }

}
