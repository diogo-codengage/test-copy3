import React, { memo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { SANBox, SANPage, SANButton } from '@sanar/components'

import RMLive from 'Components/Live'

const RMPreviousLive = memo<RouteComponentProps<{ previousId: string }>>(
    ({ history, match }) => {
        const { t } = useTranslation('resmed')

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
                <SANBox mb={{ xs: '8', _: 'xxl' }} mt={{ xs: '8', _: '0' }}>
                    <RMLive id={match.params.previousId} current={false} />
                </SANBox>
            </SANPage>
        )
    }
)

export default withRouter(RMPreviousLive)
