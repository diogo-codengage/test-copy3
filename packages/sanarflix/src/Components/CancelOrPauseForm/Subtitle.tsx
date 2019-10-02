import React from 'react'
import { useTranslation } from 'react-i18next'
import { SANTypography } from '@sanar/components'

const FLXCancelOrPauseFormSubtitle = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <>
            <SANTypography fontSize={{ xs: 'lg', _: 'md' }} color='grey.6'>
                {t('sigmentManagement.pausePage.toComplete')}
            </SANTypography>
            <SANTypography fontSize={{ xs: 'lg', _: 'md' }} color='primary'>
                {t('sigmentManagement.pausePage.completeAll')}
            </SANTypography>
        </>
    )
}

export default FLXCancelOrPauseFormSubtitle
