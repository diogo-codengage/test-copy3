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
                    mr='md'
                    variant='text'
                    uppercase
                    bold
                    onClick={onLeave}
                >
                    {t('global.leave')}
                </SANButton>
                <SANButton
                    size='small'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={onCancel}
                >
                    {t('global.back')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

export default RMLogout
