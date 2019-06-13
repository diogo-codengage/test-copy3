import React from 'react'

import { useTranslation } from 'react-i18next'

import ESForm, { withESForm } from 'sanar-ui/dist/Components/Molecules/Form'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import { useQuestionsContext } from '../Context'
import SANQuestionsFilterSelects from '../Filter/Selects'
import { makeFilter } from '../Filter'
import SANSubheader from './Subheader'

const SANQuestionDetailsPage = ({ form, history }) => {
    const { t } = useTranslation('esanar')
    const { setFilter, setFormState } = useQuestionsContext()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                setFormState(values)
                setFilter(makeFilter(values))
                history.push('/aluno/banco-questoes/perguntas/pratica')
            }
        })
    }

    return (
        <ESForm form={form} onSubmit={handleSubmit}>
            <SANPortalPagesContainer className='pb-no'>
                <SANSubheader>
                    <ESButton
                        size='small'
                        variant='solid'
                        color='primary'
                        bold
                        uppercase
                        type='submit'
                    >
                        {t('global.continue')}
                    </ESButton>
                </SANSubheader>
            </SANPortalPagesContainer>
            <SANQuestionsFilterSelects />
        </ESForm>
    )
}

export default withESForm(SANQuestionDetailsPage)
