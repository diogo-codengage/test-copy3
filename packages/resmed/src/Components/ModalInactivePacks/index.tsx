import React from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter,
    SANBox
} from '@sanar/components'

import { logout } from 'Config/AWSCognito'

interface IRMModalInactivePacksProps extends RouteComponentProps {
    date?: string
}

const RMModalInactivePacks: React.FC<IRMModalInactivePacksProps> = ({
    history,
    date
}) => {
    const { t } = useTranslation('resmed')

    const handleLogin = () =>
        logout({ callback: () => history.push('/auth/entrar') })

    return (
        <SANModal centered visible closable={false} width={375}>
            <SANBox margin='-24px' p='md'>
                <SANTypography fontSize='lg' textAlign='center'>
                    {t('modalInactivePacks.message', { date })}
                </SANTypography>
                <SANModalFooter justifyContent='center' mt='xxl'>
                    <SANButton
                        size='small'
                        variant='solid'
                        uppercase
                        bold
                        onClick={handleLogin}
                    >
                        {t('modalInactivePacks.action')}
                    </SANButton>
                </SANModalFooter>
            </SANBox>
        </SANModal>
    )
}

export default withRouter(RMModalInactivePacks)
