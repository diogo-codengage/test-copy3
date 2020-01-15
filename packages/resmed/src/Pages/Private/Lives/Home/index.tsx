import React, { memo, useMemo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { isAfter, isBefore, isToday } from 'date-fns'

import {
    SANBox,
    SANPage,
    SANEmpty,
    SANErrorBoundary,
    SANGenericError,
    useSnackbarContext
} from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import RMLive from 'Components/Live'
import {
    GET_ACTIVE_LIVE,
    IActiveLiveQuery
} from 'Apollo/Lives/Queries/active-live'
import {
    SEND_MESSAGE,
    ISendMessageMutation,
    ISendMessageVariables
} from 'Apollo/Lives/Mutations/send-message'

import RMNexts from './Nexts'
import RMPrevious from './Previous'

const ErrorBoundary = props => (
    <SANErrorBoundary
        {...props}
        component={
            <SANGenericError
                TypographyProps={{
                    color: 'grey.5'
                }}
            />
        }
    />
)

const RMLivesHome = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const snackbar = useSnackbarContext()
    const [sendMessage] = useMutation<
        ISendMessageMutation,
        ISendMessageVariables
    >(SEND_MESSAGE)
    const { loading, data } = useQuery<IActiveLiveQuery>(GET_ACTIVE_LIVE, {
        pollInterval: 60000
    })

    const handleSend = (message, { setSubmitting }) => {
        if (!!data) {
            const { activeLive } = data
            sendMessage({
                variables: { liveId: activeLive.id, message }
            })
                .catch(() =>
                    snackbar({
                        message: t('lives.sendMessageError'),
                        theme: 'error'
                    })
                )
                .finally(() => setSubmitting(false))
        } else {
            setSubmitting(false)
        }
    }

    const status = useMemo(() => {
        if (!loading && !!data) {
            const start = getUTCDate(data.activeLive.startDate)
            const end = getUTCDate(data.activeLive.endDate)
            const now = new Date()
            return {
                hasOnline: isAfter(now, start) && isBefore(now, end),
                hasLive: isToday(start)
            }
        }
        return {
            hasOnline: false,
            hasLive: false
        }
    }, [data, loading])

    return (
        <SANPage
            BoxProps={{
                p: '0'
            }}
            HeaderProps={{
                onBack: () => history.push('/inicio/curso'),
                SessionTitleProps: {
                    title: t('lives.title'),
                    subtitle: t('lives.subtitle')
                }
            }}
        >
            <SANBox pt={{ md: '8', _: '0' }} pb={{ md: '8', _: 'md' }}>
                {!!data ? (
                    <RMLive
                        loadingLive={loading}
                        live={data.activeLive}
                        hasOnline={status.hasOnline}
                        hasLive={status.hasLive}
                        chat={{
                            onSend: handleSend,
                            messages: [],
                            blocked: false,
                            loading: false
                        }}
                    />
                ) : (
                    <SANEmpty title={t('lives.empty')} />
                )}
            </SANBox>
            <ErrorBoundary>
                <RMNexts />
            </ErrorBoundary>
            <ErrorBoundary>
                <RMPrevious />
            </ErrorBoundary>
        </SANPage>
    )
})

export default withRouter(RMLivesHome)
