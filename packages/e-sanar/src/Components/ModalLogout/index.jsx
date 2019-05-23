import React from 'react'

import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESModal, { ESModalFooter } from 'sanar-ui/dist/Components/Atoms/Modal'

const SANLogout = ({ onLeave, onCancel, ...props }) => {
    const { t } = useTranslation()

    return (
        <ESModal
            cancelText='sair'
            okText='voltar'
            title='Sair da conta'
            {...props}
            centered
            closable={false}
        >
            <ESTypography variant='subtitle1'>
                {t('logout.message')}
            </ESTypography>
            <ESModalFooter>
                <ESButton
                    size='small'
                    className='mr-md'
                    variant='text'
                    uppercase
                    bold
                    onClick={onLeave}
                >
                    {t('global.leave')}
                </ESButton>
                <ESButton
                    size='small'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={onCancel}
                >
                    {t('global.back')}
                </ESButton>
            </ESModalFooter>
        </ESModal>
    )
}

export default SANLogout
