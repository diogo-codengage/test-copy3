import React, { memo, useMemo, useEffect, useRef, useState } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { isAfter, isBefore, isToday } from 'date-fns'
import { sortBy, path, uniqBy, prop } from 'ramda'

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
import { SUBSCRIPTION_LIVE_CHAT } from 'Apollo/Lives/Subscriptions/live-chat'
import {
    GET_LIVE_MESSAGES,
    ILiveMessagesQuery,
    ILiveMessagesVariables
} from 'Apollo/Lives/Queries/live-messages'

import RMNexts from './Nexts'
import RMPrevious from './Previous'

import { updateCacheMessages } from '../Previous'

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
    const chatRef = useRef<any>()
    const snackbar = useSnackbarContext()
    const [hasOnline, setOnline] = useState(false)
    const [hasLive, setLive] = useState(false)
    const [sendMessage] = useMutation<
        ISendMessageMutation,
        ISendMessageVariables
    >(SEND_MESSAGE)
    const { loading, data } = useQuery<IActiveLiveQuery>(GET_ACTIVE_LIVE, {
        fetchPolicy: 'network-only'
    })

    const activeLiveId = useMemo(
        () => (!!data && !!data.activeLive ? data.activeLive.id : undefined),
        [data]
    )

    const {
        loading: loadingMessages,
        data: dataMessages,
        fetchMore,
        subscribeToMore
    } = useQuery<ILiveMessagesQuery, ILiveMessagesVariables>(
        GET_LIVE_MESSAGES,
        {
            variables: { liveId: activeLiveId, limit: 25 },
            skip: !activeLiveId
        }
    )

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

    const calculateStartLive = activeLive => {
        const start = getUTCDate(activeLive.startDate)
        const end = getUTCDate(activeLive.endDate)
        const now = new Date()

        const online = isAfter(now, start) && isBefore(now, end)
        const live = isToday(start)

        online !== hasOnline && setOnline(online)
        live !== hasLive && setLive(live)
    }

    useEffect(() => {
        if (!!activeLiveId) {
            subscribeToMore({
                document: SUBSCRIPTION_LIVE_CHAT,
                variables: { liveId: activeLiveId },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    const newMessage = subscriptionData.data['liveChat']

                    if (!!chatRef && !!chatRef.current) {
                        chatRef.current.goScrollBottom()
                    }

                    return Object.assign({}, prev, {
                        liveMessages: {
                            ...prev.liveMessages,
                            items: uniqBy(prop('id'), [
                                newMessage,
                                ...prev.liveMessages.items
                            ])
                        }
                    })
                }
            })
        }
    }, [activeLiveId, subscribeToMore])

    useEffect(() => {
        let interval
        if (!loading && !!data) {
            calculateStartLive(data.activeLive)
            interval = setInterval(
                () => calculateStartLive(data.activeLive),
                10000
            )
        }
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading])

    const messages = useMemo(() => {
        if (
            !loadingMessages &&
            dataMessages &&
            dataMessages.liveMessages &&
            dataMessages.liveMessages.items
        ) {
            return {
                items: dataMessages.liveMessages.items,
                total: dataMessages.liveMessages.totalCount
            }
        } else {
            return {
                items: [],
                total: 0
            }
        }
    }, [dataMessages, loadingMessages])

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
                        ref={chatRef}
                        loadingLive={loading}
                        live={data.activeLive}
                        hasLive={hasLive}
                        chat={{
                            messages: sortBy(path(['time']))(messages.items),
                            // blocked: !hasOnline,
                            onSend: handleSend,
                            loading: loadingMessages,
                            hasMore: messages.total > messages.items.length,
                            loadMore: () =>
                                fetchMore({
                                    variables: {
                                        skip: messages.items.length
                                    },
                                    updateQuery: updateCacheMessages
                                })
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
