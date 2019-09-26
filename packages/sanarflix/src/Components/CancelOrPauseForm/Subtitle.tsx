import React from 'react'
import { useTranslation } from 'react-i18next'
import { SANTypography } from '@sanar/components'

const FLXCancelOrPauseFormSubtitle = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <>
            <SANTypography>
                {t('sigmentManagement.pausePage.toComplete')}
            </SANTypography>
            <SANTypography color='primary'>
                {t('sigmentManagement.pausePage.completeAll')}
            </SANTypography>
        </>
    )
}

export default FLXCancelOrPauseFormSubtitle
