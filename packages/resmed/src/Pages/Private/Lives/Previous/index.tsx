import React, { useMemo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'

import { SANBox, SANPage, SANButton } from '@sanar/components'

import RMLive from 'Components/Live'
import { GET_LIVE, ILiveQuery, ILiveVariables } from 'Apollo/Lives/Queries/live'
import {
    GET_LIVE_MESSAGES,
    ILiveMessagesQuery,
    ILiveMessagesVariables
} from 'Apollo/Lives/Queries/live-messages'

interface IOptions {
    fetchMoreResult?: ILiveMessagesQuery
}

const updateCacheMessages = (prev: ILiveMessagesQuery, options: IOptions) => {
    const { fetchMoreResult } = options
    if (!fetchMoreResult) return prev

    return Object.assign({}, prev, {
        liveMessages: {
            ...prev.liveMessages,
            items: [
                ...prev.liveMessages.items,
                ...fetchMoreResult.liveMessages.items
            ]
        }
    })
}

const RMPreviousLive: React.FC<RouteComponentProps<{ previousId: string }>> = ({
    history,
    match: { params }
}) => {
    const { t } = useTranslation('resmed')

    const { loading: loadingLive, data: dataLive } = useQuery<
        ILiveQuery,
        ILiveVariables
    >(GET_LIVE, { variables: { id: params.previousId } })

    const {
        loading: loadingMessages,
        data: dataMessages,
        fetchMore
    } = useQuery<ILiveMessagesQuery, ILiveMessagesVariables>(
        GET_LIVE_MESSAGES,
        {
            variables: { liveId: params.previousId, limit: 5 }
        }
    )

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

    const handleLoadMore = () => {
        fetchMore({
            variables: {
                skip: messages.items.length
            },
            updateQuery: updateCacheMessages
        })
    }

    return (
        <SANPage
            BoxProps={{
                p: '0'
            }}
            HeaderProps={{
                SessionTitleProps: {
                    title: t('lives.previous.title')
                },
                ExtraProps: {
                    sm: 9,
                    md: 7,
                    lg: 5
                },
                extra: (
                    <SANBox display='flex' flex='1'>
                        <SANButton
                            size='small'
                            variant='outlined'
                            uppercase
                            bold
                            block
                            onClick={() => history.push('/inicio/lives/atual')}
                        >
                            {t('lives.previous.back')}
                        </SANButton>
                    </SANBox>
                )
            }}
        >
            <SANBox pt={{ md: '8', _: '0' }} pb={{ md: '8', _: 'md' }}>
                <RMLive
                    live={dataLive && dataLive.live}
                    loadingLive={loadingLive}
                    hasLive={false}
                    chat={{
                        messages: messages.items,
                        blocked: true,
                        loading: loadingMessages,
                        hasMore: messages.total > messages.items.length,
                        loadMore: handleLoadMore
                    }}
                />
            </SANBox>
        </SANPage>
    )
}

export default withRouter(RMPreviousLive)
