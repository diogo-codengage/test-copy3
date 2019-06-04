import React from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import ESForm, { withESForm } from 'sanar-ui/dist/Components/Molecules/Form'

import SANQuestionsFilterHeader from './Header'
import SANQuestionsFilterSelects from './Selects'

const SANQuestionsFilter = ({ form, history, ...props }) => {
    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                history.push('./perguntas')
            }
        })
    }

    return (
        <ESForm form={form} onSubmit={handleSubmit}>
            <SANQuestionsFilterHeader />
            <SANQuestionsFilterSelects />
        </ESForm>
    )
}

const enhance = compose(
    withESForm,
    withRouter
)

export default enhance(SANQuestionsFilter)
