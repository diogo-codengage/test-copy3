import React from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import ESForm, { withESForm } from 'sanar-ui/dist/Components/Molecules/Form'

import { useAuthContext } from 'Hooks/auth'
import SANQuestionsFilterHeader from './Header'
import SANQuestionsFilterSelects from './Selects'

const SANQuestionsFilter = ({ form, history }) => {
    const { getEnrollment } = useAuthContext()

    const {
        course: { id }
    } = getEnrollment()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const filter = {
                    ...(values.year && {
                        year: Number(values.year.format('YYYY'))
                    }),
                    ...(values.tags && { tagIds: values.tags.map(mapItem) }),
                    ...(values.levels && {
                        levelIds: values.levels.map(mapItem)
                    }),
                    ...(values.boards && {
                        boardIds: values.boards.map(mapItem)
                    }),
                    ...(values.exams && { examIds: values.exams.map(mapItem) }),
                    courseId: id
                }
                history.push('./perguntas', filter)
            }
        })
    }

    const mapItem = item => item.value

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
