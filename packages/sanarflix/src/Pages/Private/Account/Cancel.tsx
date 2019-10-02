import React, { useState } from 'react'
import {
    SANPage,
    SANBox,
    SANSessionTitle,
    SANLayoutContainer,
    SANRow,
    SANCol,
    SANButton,
    SANTypography,
    useSnackbarContext,
    SANModal
} from '@sanar/components'
import { RouteComponentProps, withRouter } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
    FLXCancelOrPauseFormSubtitle,
    FLXCancelOrPauseForm
} from 'Components/CancelOrPauseForm'
import { useApolloClient } from '@apollo/react-hooks'
import { CANCEL_SUBSCRIPTION } from 'Apollo/SignmentManagement/Mutations/cancel'
import FLXModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

import { useAuthContext } from 'Hooks/auth'

const Notice = ({ action }) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANBox
            border='1px solid'
            borderRadius='base'
            borderColor='red.4'
            backgroundColor='red.5'
            p={{ xs: 6, _: 'sm' }}
        >
            <SANTypography color='grey.7' mb={4} level={6}>
                {t('sigmentManagement.cancelPage.notice.header')}
            </SANTypography>
            <SANTypography mb={3} variant='subtitle2'>
                • {t('sigmentManagement.cancelPage.notice.item1')}
            </SANTypography>
            <SANTypography component='div' variant='subtitle2'>
                • {t('sigmentManagement.cancelPage.notice.item2')}
                <SANTypography
                    ml={1}
                    strong
                    color='primary'
                    component='span'
                    variant='subtitle2'
                    onClick={action}
                >
                    {t('sigmentManagement.cancelPage.notice.knowMore')}
                </SANTypography>
            </SANTypography>
        </SANBox>
    )
}

const Subtitle = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <>
            <SANTypography fontSize={{ xs: 'lg', _: '13px' }} color='grey.6'>
                {t('sigmentManagement.cancelPage.doYouWantSubtitle1')}
            </SANTypography>
            <SANBox display={{ xs: 'block', _: 'none' }}>
                <SANTypography fontSize={{ xs: 'lg', _: 'md' }} color='grey.6'>
                    {t('sigmentManagement.cancelPage.doYouWantSubtitle2')}
                </SANTypography>
            </SANBox>
        </>
    )
}

const FLXCancelPage = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
    const {
        me: { plan }
    } = useAuthContext()
    const client = useApolloClient()
    const createSnackbar = useSnackbarContext()
    const [modalVisible, setModalVisible] = useState(false)
    const [showModalTerms, setShowModalTerms] = useState(false)

    const onSubmit = async values => {
        try {
            await client.mutate({
                mutation: CANCEL_SUBSCRIPTION,
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

    return (
        <>
            <SANPage
                HeaderProps={{
                    onBack: () => history.goBack(),
                    SessionTitleProps: {
                        title: t('sigmentManagement.cancelPage.header'),
                        subtitle: t('sigmentManagement.cancelPage.subtitle')
                    }
                }}
            >
                {plan.payment_frequency === 'month' && (
                    <SANBox backgroundColor='grey-solid.1' py={{ _: 3, lg: 7 }}>
                        <SANLayoutContainer>
                            <SANSessionTitle
                                mt={6}
                                mb={6}
                                title={t(
                                    'sigmentManagement.cancelPage.doYouWant'
                                )}
                                subtitle={<Subtitle />}
                                extra={
                                    <SANButton
                                        px={8}
                                        uppercase
                                        bold
                                        blockOnlyMobile
                                        onClick={() =>
                                            history.push(
                                                '/portal/minha-conta/pause-assinatura'
                                            )
                                        }
                                        variant='solid'
                                        color='primary'
                                    >
                                        {t(
                                            'sigmentManagement.cancelPage.doYouWantExtra'
                                        )}
                                    </SANButton>
                                }
                            />
                        </SANLayoutContainer>
                    </SANBox>
                )}
                <SANLayoutContainer>
                    <SANBox mt={6} display={{ _: 'block', lg: 'none' }}>
                        <Notice action={() => setShowModalTerms(true)} />
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
                                destiny='cancel'
                            />
                        </SANCol>
                        <SANCol xs={0} lg={8}>
                            <Notice action={() => setShowModalTerms(true)} />
                        </SANCol>
                    </SANRow>
                </SANLayoutContainer>
            </SANPage>
            <SANModal
                visible={modalVisible}
                centered
                closable={false}
                title={t('sigmentManagement.cancelPage.modal.title')}
                footer={
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent='flex-end'
                    >
                        <SANButton
                            size='small'
                            onClick={() => history.push('/portal/inicio')}
                            color='primary'
                            variant='solid'
                            bold
                        >
                            {t('sigmentManagement.cancelPage.modal.ok')}
                        </SANButton>
                    </SANBox>
                }
            >
                <SANTypography
                    variant='subtitle1'
                    color='grey.7'
                    mb={{ sm: 'md', _: 'xs' }}
                >
                    {t('sigmentManagement.cancelPage.modal.description1')}
                </SANTypography>
                <SANTypography variant='subtitle1' color='grey.7'>
                    {t('sigmentManagement.cancelPage.modal.description2')}
                </SANTypography>
            </SANModal>
            <FLXModalTermsAndPrivacy
                onCancel={() => setShowModalTerms(false)}
                visible={showModalTerms}
                defaultActiveKey={0}
                scrolling
            />
        </>
    )
}

export default withRouter(FLXCancelPage)
