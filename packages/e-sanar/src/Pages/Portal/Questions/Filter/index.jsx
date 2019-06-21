import React, { useEffect } from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import ESForm, { withESForm } from 'sanar-ui/dist/Components/Molecules/Form'

import { useQuestionsContext } from '../Context'
import SANQuestionsFilterHeader from './Header'
import SANQuestionsFilterSelects from './Selects'

const mapItem = item => item.value
export const makeFilter = values => ({
    ...(values.year && {
        years: [Number(values.year.format('YYYY'))]
    }),
    ...(values.tags && { tagIds: values.tags.map(mapItem) }),
    ...(values.levels && {
        levelIds: values.levels.map(mapItem)
    }),
    ...(values.boards && {
        boardIds: values.boards.map(mapItem)
    }),
    ...(values.exams && { examIds: values.exams.map(mapItem) }),
    ...(values.justCommented && { justCommented: values.justCommented }),
    ...(values.progress && { progress: values.progress })
})

const SANQuestionsFilter = ({ form, history }) => {
    const {
        setFilter,
        setFormState,
        setTotalQuestions,
        setQuestions
    } = useQuestionsContext()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                setFormState(values)
                setFilter(makeFilter(values))
                history.push('./perguntas/pratica')
            }
        })
    }

    useEffect(() => {
        setTotalQuestions(0)
        setQuestions()
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

const enhance = compose(
    withESForm,
    withRouter
)

export default enhance(SANQuestionsFilter)
