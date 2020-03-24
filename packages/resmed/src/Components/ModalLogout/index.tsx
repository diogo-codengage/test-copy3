import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter
} from '@sanar/components'

const RMLogout = ({ onLeave, onCancel, ...props }) => {
    const { t } = useTranslation('resmed')

    return (
        <SANModal
            title={t('logout.signOut')}
            centered
            closable={false}
            {...props}
        >
            <SANTypography variant='subtitle1'>
                {t('logout.message')}
            </SANTypography>
            <SANModalFooter>
                <SANButton
                    size='small'
                    variant='text'
                    uppercase
                    bold
                    onClick={onCancel}
                >
                    {t('global.back')}
                </SANButton>
                <SANButton
                    size='small'
                    mr='md'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={onLeave}
                >
                    {t('global.leave')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

export default RMLogout
