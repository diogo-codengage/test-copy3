import React, { useCallback, memo } from 'react'

import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import {
    SANButton,
    SANLayoutContainer,
    SANSessionTitle,
    SANBox,
    SANTypography,
    SANCarousel,
    SANQuery
} from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import { GET_LIVES, ILivesQuery, ILive } from 'Apollo/Lives/Queries/lives'

const responsive = size => [
    {
        breakpoint: 1920,
        settings: {
            slidesToShow: 4,
            infinite: size > 4,
            centerMode: false
        }
    },
    {
        breakpoint: 1560,
        settings: {
            slidesToShow: 4,
            infinite: size > 4,
            centerMode: false
        }
    },
    {
        breakpoint: 1280,
        settings: {
            slidesToShow: 3,
            arrows: false,
            infinite: size > 3,
            centerMode: true
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            arrows: false,
            infinite: size > 2,
            centerMode: true
        }
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 1,
            arrows: false,
            infinite: size > 1,
            centerMode: true
        }
    }
]

const SANBoxStyled = styled(SANBox)`
    border-top: 1px solid ${theme('colors.grey.0')};
    border-bottom: 1px solid ${theme('colors.grey.0')};
`

const RMCardNextLive = memo<{ title: string; subtitle: string }>(
    ({ title, subtitle }) => {
        const { t } = useTranslation('resmed')
        return (
            <SANBox
                borderRadius='base'
                border='1px solid'
                borderColor='grey.1'
                boxShadow='1'
                bg='white.10'
                mx='sm'
            >
                <SANBox
                    py='sm'
                    px='md'
                    minHeight='92px'
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                >
                    <SANTypography
                        fontSize='md'
                        fontWeight='bold'
                        color='grey.6'
                        mb='xs'
                        ellipsis={{ rows: 2 }}
                    >
                        {title}
                    </SANTypography>
                    <SANTypography fontSize='sm' color='grey.4'>
                        {subtitle}
                    </SANTypography>
                </SANBox>
            </SANBox>
        )
    }
)

const RMNexts = memo(() => {
    const { t } = useTranslation('resmed')

    const renderLive = useCallback(
        (live: ILive) => (
            <RMCardNextLive
                key={live.id}
                title={live.title}
                subtitle={format(
                    getUTCDate(live.startDate),
                    `DD/MM/YYYY [${t('lives.nextsList.at')}] HH[h]`
                )}
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <SANQuery
            query={GET_LIVES}
            options={{
                variables: {
                    start: format(new Date(), 'YYYY-MM-DD')
                }
            }}
            loaderProps={{ minHeight: '200px', flex: true }}
        >
            {({ data: { lives } }: { data: ILivesQuery }) => {
                if (!lives.items.length) return null

                return (
                    <SANBoxStyled bg='grey-solid.1' py={{ xs: '8', _: 'md' }}>
                        <SANLayoutContainer>
                            <SANSessionTitle
                                title={t('lives.nextsList.title')}
                            />
                            <SANBox mx='-12px'>
                                <SANCarousel
                                    slidesToScroll={1}
                                    slidesToShow={4}
                                    infinite={false}
                                    dots={false}
                                    arrows
                                    focusOnSelect
                                    swipe
                                    swipeToSlide
                                    responsive={responsive(lives.items.length)}
                                    draggable
                                >
                                    {lives.items.map(renderLive)}
                                </SANCarousel>
                            </SANBox>
                        </SANLayoutContainer>
                    </SANBoxStyled>
                )
            }}
        </SANQuery>
    )
})

export default RMNexts
