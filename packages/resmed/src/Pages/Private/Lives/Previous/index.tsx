import React, { memo, useState, useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { SANBox, SANPage, SANButton } from '@sanar/components'

import RMLive from 'Components/Live'
import { GET_LIVE, ILiveQuery } from 'Apollo/Lives/Queries/live'

const RMPreviousLive = memo<RouteComponentProps<{ previousId: string }>>(
    ({ history, match }) => {
        const { t } = useTranslation('resmed')
        const client = useApolloClient()
        const [loading, setLoading] = useState(false)
        const [live, setLive] = useState()

        useEffect(() => {
            const fetchLive = async () => {
                setLoading(true)
                try {
                    const {
                        data: { live }
                    } = await client.query<ILiveQuery>({
                        query: GET_LIVE,
                        variables: { id: match.params.previousId }
                    })
                    setLive(live)
                } catch {}
                setLoading(false)
            }
            !!match.params.previousId && fetchLive()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [match.params.previousId])

        return (
            <SANPage
                BoxProps={{
                    p: '0'
                }}
                HeaderProps={{
                    SessionTitleProps: {
                        title: t('lives.previous.title'),
                        extra: (
                            <SANBox display='flex' flex='1'>
                                <SANButton
                                    size='small'
                                    variant='outlined'
                                    uppercase
                                    bold
                                    block
                                    onClick={() =>
                                        history.push('/inicio/lives/atual')
                                    }
                                >
                                    {t('lives.previous.back')}
                                </SANButton>
                            </SANBox>
                        )
                    }
                }}
            >
                <SANBox pt={{ md: '8', _: '0' }} pb={{ md: '8', _: 'md' }}>
                    <RMLive live={live} loading={loading} hasLive={false} />
                </SANBox>
            </SANPage>
        )
    }
)

export default withRouter(RMPreviousLive)
