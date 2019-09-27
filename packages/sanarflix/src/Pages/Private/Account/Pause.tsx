import React, { useState, useEffect } from 'react'
import {
    SANPage,
    SANBox,
    SANSessionTitle,
    SANRow,
    SANCol,
    SANTypography,
    useSnackbarContext,
    SANModal,
    SANButton
} from '@sanar/components'

import {
    FLXCancelOrPauseForm,
    FLXCancelOrPauseFormSubtitle
} from 'Components/CancelOrPauseForm'
import { useApolloClient } from '@apollo/react-hooks'
import { PAUSE_SUBSCRIPTION } from 'Apollo/SignmentManagement/Mutations/pause'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'

import { useAuthContext } from 'Hooks/auth'

const Notice = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANBox
            border='1px solid'
            borderRadius='base'
            borderColor='red.4'
            backgroundColor='red.5'
            p={6}
        >
            <SANTypography color='grey.7' mb={4} level={6}>
                {t('sigmentManagement.pausePage.notice.header')}
            </SANTypography>
            <SANTypography mb={3} variant='subtitle-2'>
                • {t('sigmentManagement.pausePage.notice.item1')}
            </SANTypography>
            <SANTypography variant='subtitle-2'>
                • {t('sigmentManagement.pausePage.notice.item2')}
            </SANTypography>
        </SANBox>
    )
}

const FLXPausePage = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
    const [modalVisible, setModalVisible] = useState(false)
    const client = useApolloClient()
    const {
        me: { plan }
    } = useAuthContext()
    const createSnackbar = useSnackbarContext()

    const onSubmit = async values => {
        try {
            await client.mutate({
                mutation: PAUSE_SUBSCRIPTION,
                variables: {
                    input: values
                }
            })

            setModalVisible(true)
        } catch (e) {
            createSnackbar({
                message: t('sanarui:error.default'),
                theme: 'error'
            })
        }
    }

    useEffect(() => {
        if (plan.payment_frequency !== 'month') {
            history.push('/portal/minha-conta/cancelar-assinatura')
        }
    }, [])

    return (
        <>
            <SANPage
                hasContainer
                HeaderProps={{
                    onBack: () => history.goBack(),
                    SessionTitleProps: {
                        title: t('sigmentManagement.pausePage.header'),
                        subtitle: t('sigmentManagement.pausePage.subtitle')
                    }
                }}
            >
                <SANBox mt={6} display={{ _: 'block', lg: 'none' }}>
                    <Notice />
                </SANBox>
                <SANSessionTitle
                    my={6}
                    title={t('sigmentManagement.pausePage.completeFields')}
                    subtitle={<FLXCancelOrPauseFormSubtitle />}
                />
                <SANRow gutter={24}>
                    <SANCol lg={16}>
                        <FLXCancelOrPauseForm
                            onSubmit={onSubmit}
                            destiny='pause'
                        />
                    </SANCol>
                    <SANCol xs={0} lg={8}>
                        <Notice />
                    </SANCol>
                </SANRow>
            </SANPage>
            <SANModal
                visible={modalVisible}
                centered
                closable={false}
                title={t('sigmentManagement.pausePage.modal.title')}
                footer={
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent='flex-end'
                    >
                        <SANButton
                            size='small'
                            onClick={() => history.push('/portal')}
                            color='primary'
                            variant='solid'
                            bold
                        >
                            {t('sigmentManagement.pausePage.modal.ok')}
                        </SANButton>
                    </SANBox>
                }
            >
                <SANTypography
                    variant='subtitle1'
                    color='grey.7'
                    mb={{ sm: 'md', _: 'xs' }}
                >
                    {t('sigmentManagement.pausePage.modal.description1')}
                </SANTypography>
                <SANTypography variant='subtitle1' color='grey.7'>
                    {t('sigmentManagement.pausePage.modal.description2')}
                </SANTypography>
            </SANModal>
        </>
    )
}

export default withRouter(FLXPausePage)
