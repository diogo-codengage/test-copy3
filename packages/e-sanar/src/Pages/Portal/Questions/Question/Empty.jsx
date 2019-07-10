import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ESEmpty from 'sanar-ui/dist/Components/Atoms/Empty'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

const SANEmptyQuestions = ({ history }) => {
    const { t } = useTranslation('esanar')

    const goFilters = () =>
        history.push('/aluno/banco-questoes/perguntas/filtro')

    return (
        <ESEmpty
            description={
                <ESTypography component='span'>
                    {t('questionBase.question.empty')}
                </ESTypography>
            }
        >
            <ESButton
                onClick={goFilters}
                variant='solid'
                size='small'
                className='mt-md'
            >
                {t('questionBase.question.seeFilters')}
            </ESButton>
        </ESEmpty>
    )
}

export default withRouter(SANEmptyQuestions)
