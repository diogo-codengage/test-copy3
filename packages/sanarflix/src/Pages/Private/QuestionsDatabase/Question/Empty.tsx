import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANButton, SANTypography, SANEmpty } from '@sanar/components'

const FLXEmpty = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANEmpty
            BoxProps={{
                maxWidth: '400px'
            }}
            title={
                <SANTypography component='span'>
                    {t('questionsDatabase.question.empty')}
                </SANTypography>
            }
        >
            <SANButton
                onClick={() =>
                    history.push('/portal/banco-questoes/perguntas/filtro')
                }
                variant='solid'
                size='small'
                mt='md'
            >
                {t('questionsDatabase.question.seeFilters')}
            </SANButton>
        </SANEmpty>
    )
}

export default withRouter(FLXEmpty)
