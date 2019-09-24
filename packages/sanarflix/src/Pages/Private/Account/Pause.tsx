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

import { FLXCancelOrPauseForm } from 'Components/CancelOrPauseForm'
import { useApolloClient } from '@apollo/react-hooks'
import { PAUSE_SUBSCRIPTION } from 'Apollo/SignmentManagement/Mutations/pause'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'

const Subtitle = () => {
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

const FLXPausePage: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const [modalVisible, setModalVisible] = useState(false)
    const client = useApolloClient()
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

    useEffect(() => console.log(modalVisible), [modalVisible])

    return (
        <>
            <SANPage
                hasContainer
                HeaderProps={{
                    goBack: console.log,
                    SessionTitleProps: {
                        title: t('sigmentManagement.pausePage.header')
                    }
                }}
            >
                <SANBox mt={6} display={{ _: 'block', lg: 'none' }}>
                    <Notice />
                </SANBox>
                <SANSessionTitle
                    mt={6}
                    mb={6}
                    title={t('sigmentManagement.pausePage.completeFields')}
                    subtitle={<Subtitle />}
                />
                <SANRow gutter={12}>
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
                title={t('sigmentManagement.pausePage.modal.title')}
                footer={
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent='flex-end'
                    >
                        <SANButton
                            onClick={() => history.push('/portal')}
                            color='primary'
                            variant='solid'
                        >
                            {t('sigmentManagement.pausePage.modal.ok')}
                        </SANButton>
                    </SANBox>
                }
            >
                {t('sigmentManagement.pausePage.modal.description')}
            </SANModal>
        </>
    )
}

export default withRouter(FLXPausePage)
