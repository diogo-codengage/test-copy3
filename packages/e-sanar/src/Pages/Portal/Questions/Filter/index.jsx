import React, { useEffect } from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import ESForm, { withESForm } from 'sanar-ui/dist/Components/Molecules/Form'

import { useAuthContext } from 'Hooks/auth'
import { useQuestionsContext } from '../Context'
import SANQuestionsFilterHeader from './Header'
import SANQuestionsFilterSelects from './Selects'

const mapItem = item => item.value
export const makeFilter = (values, userId) => {
    if (!userId) {
        throw Error('Argument userId is required in function makeFilter')
    }
    return {
        ...(values.years && {
            years: values.years.map(y => Number(y))
        }),
        ...(values.tags && { tagIds: values.tags.map(mapItem) }),
        ...(values.levels && {
            levelIds: values.levels.map(mapItem)
        }),
        ...(values.boards && {
            boardIds: values.boards.map(mapItem)
        }),
        ...(values.exams && { examIds: values.exams.map(mapItem) }),
        ...(values.isCommentedByExpert && {
            isCommentedByExpert: values.isCommentedByExpert
        }),
        ...(values.progress === '2' && { notAnsweredByUser: userId }),
        ...(values.progress === '3' && { answeredByUser: userId })
    }
}

const SANQuestionsFilter = ({ form, history }) => {
    const {
        setFilter,
        setFormState,
        setTotalQuestions,
        setQuestions
    } = useQuestionsContext()
    const {
        me: { id }
    } = useAuthContext()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                setFormState(values)
                setFilter(makeFilter(values, id))
                history.push('./perguntas/pratica')
            }
        })
    }

    useEffect(() => {
        setTotalQuestions(0)
        setQuestions([])
        setFormState({ progress: '1' })
    }, [setTotalQuestions, setQuestions, setFormState])

    return (
        <ESForm form={form} onSubmit={handleSubmit}>
            <SANQuestionsFilterHeader
                goHistory={() => history.push('./historico')}
            />
            <SANQuestionsFilterSelects />
        </ESForm>
    )
}

const enhance = compose(withESForm, withRouter)

export default enhance(SANQuestionsFilter)
