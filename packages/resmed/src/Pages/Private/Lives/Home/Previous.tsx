import React, { useCallback, useState, useMemo, memo, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { format } from 'date-fns'

import {
    SANLayoutContainer,
    SANCardLive,
    SANRow,
    SANCol,
    SANButton,
    SANBox,
    SANEvaIcon,
    SANTypography,
    SANQuery
} from '@sanar/components'
import { useThemeContext, useWindowSize } from '@sanar/utils/dist/Hooks'
import { getUTCDate } from '@sanar/utils/dist/Date'

import { GET_LIVES, ILivesQuery, ILive } from 'Apollo/Lives/Queries/lives'

const updateCacheLives = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    return Object.assign({}, prev, {
        lives: {
            ...prev.lives,
            ...prev.lives
        }
    })
}

const storageKey = 'rm-previous-list-lives'

const RMPrevious = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const theme = useThemeContext()
    const { width } = useWindowSize()
    const [hasList, setHasList] = useState(false)

    useEffect(() => {
        const item = localStorage.getItem(storageKey)
        if (!!item && Boolean(item) !== hasList) {
            setHasList(Boolean(item))
        }
        return () => {
            localStorage.setItem(storageKey, hasList.toString())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const propsCol = useMemo(() => {
        return hasList
            ? {
                  span: 24
              }
            : {
                  xs: 24,
                  sm: 12,
                  md: 12,
                  lg: 6
              }
    }, [hasList])

    const isList = useMemo(() => width > 576, [width])

    const renderLive = useCallback(
        (live: ILive) => (
            <SANCol mb={{ sm: 'xl', _: 'sm' }} key={live.id} {...propsCol}>
                <SANCardLive
                    hasList={isList ? hasList : true}
                    title={live.title}
                    date={format(getUTCDate(live.startDate), 'DD/MM/YYYY')}
                    description={live.description}
                    image={live.image}
                    onClick={() =>
                        history.push(`/inicio/lives/anterior/${live.id}`)
                    }
                />
            </SANCol>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [hasList, isList, t]
    )

    return (
        <SANQuery
            query={GET_LIVES}
            options={{
                variables: {
                    end: format(new Date(), 'YYYY-MM-DD')
                }
            }}
            loaderProps={{ minHeight: '200px', flex: true }}
        >
            {({
                data: { lives },
                fetchMore
            }: {
                data: ILivesQuery
                fetchMore: (data: any) => Object
            }) => {
                if (!lives.items.length) return null

                return (
                    <SANBox py={{ xs: '8', _: 'md' }}>
                        <SANLayoutContainer>
                            <SANBox
                                display='flex'
                                alignItem='center'
                                justifyConten='space-between'
                                mb='md'
                            >
                                <SANBox flex='1'>
                                    <SANTypography
                                        fontWeight='bold'
                                        fontSize='lg'
                                    >
                                        {t('lives.previousList.title')}
                                    </SANTypography>
                                </SANBox>
                                <SANBox
                                    display={{ md: 'flex', _: 'none' }}
                                    alignItems='center'
                                    justifyContent='flex-end'
                                >
                                    <SANButton
                                        size='xsmall'
                                        variant='text'
                                        circle
                                        mr='xs'
                                        style={{
                                            backgroundColor:
                                                !hasList && theme.colors.grey[2]
                                        }}
                                        onClick={() => setHasList(false)}
                                    >
                                        <SANEvaIcon name='grid-outline' />
                                    </SANButton>
                                    <SANButton
                                        size='xsmall'
                                        variant='text'
                                        circle
                                        style={{
                                            backgroundColor:
                                                hasList && theme.colors.grey[2]
                                        }}
                                        onClick={() => setHasList(true)}
                                    >
                                        >
                                        <SANEvaIcon name='list-outline' />
                                    </SANButton>
                                </SANBox>
                            </SANBox>
                            <SANRow gutter={24}>
                                {lives.items.map(renderLive)}
                            </SANRow>
                            {lives.items.length < lives.totalCount && (
                                <SANBox
                                    maxWidth='232px'
                                    mt={{ xs: 'xl', _: 'md' }}
                                    mx='auto'
                                >
                                    <SANButton
                                        size='xsmall'
                                        variant='outlined'
                                        color='primary'
                                        uppercase
                                        bold
                                        block
                                        onClick={() =>
                                            fetchMore({
                                                variables: {
                                                    skip: lives.items.length
                                                },
                                                updateQuery: updateCacheLives
                                            })
                                        }
                                    >
                                        {t('lives.previousList.loadMore')}
                                    </SANButton>
                                </SANBox>
                            )}
                        </SANLayoutContainer>
                    </SANBox>
                )
            }}
        </SANQuery>
    )
})

export default withRouter(RMPrevious)
