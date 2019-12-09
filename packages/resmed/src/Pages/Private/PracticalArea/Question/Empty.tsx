import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANButton, SANTypography, SANEmpty } from '@sanar/components'

const RMEmpty = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')

    return (
        <SANEmpty
            BoxProps={{
                maxWidth: '400px'
            }}
            title={
                <SANTypography
                    color='grey.4'
                    fontSize='lg'
                    textAlign='center'
                    fontWeight='regular'
                >
                    {t('practicalArea.question.empty')}
                </SANTypography>
            }
        >
            <SANButton
                onClick={() => history.push('./filtro')}
                uppercase
                variant='solid'
                mt='xl'
            >
                {t('practicalArea.question.seeFilters')}
            </SANButton>
        </SANEmpty>
    )
}

export default withRouter(RMEmpty)
