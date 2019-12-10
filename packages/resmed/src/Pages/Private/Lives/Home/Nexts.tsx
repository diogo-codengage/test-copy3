import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import {
    SANButton,
    SANLayoutContainer,
    SANSessionTitle,
    SANBox,
    SANTypography,
    SANCarousel,
    SANQuery
} from '@sanar/components'

import { GET_LIVES, ILivesQuery, ILive } from 'Apollo/Lives/Queries/lives'

const arr = new Array(20).fill(0).map((_, i) => i)

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
        breakpoint: 960,
        settings: {
            slidesToShow: 2,
            arrows: false,
            infinite: size > 2,
            centerMode: true
        }
    },
    {
        breakpoint: 576,
        settings: {
            slidesToShow: 1,
            arrows: false,
            infinite: size > 1,
            centerMode: true
        }
    }
]

const RMCardNextLive = ({ title, subtitle }) => {
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
            <SANBox
                display='flex'
                alignItems='center'
                justifyContent='center'
                p='xxs'
                borderTop='1px solid'
                borderColor='grey.1'
            >
                <SANButton
                    uppercase
                    bold
                    block
                    size='xsmall'
                    variant='text'
                    color='primary'
                    disabled
                >
                    {t('lives.nextsList.seeLive')}
                </SANButton>
            </SANBox>
        </SANBox>
    )
}

const RMNexts = () => {
    const { t } = useTranslation('resmed')

    const renderLive = useCallback(
        (live: ILive) => (
            <RMCardNextLive
                key={live.id}
                title={live.title}
                subtitle={live.date}
            />
        ),
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
                if (!lives.length) return null

                return (
                    <SANBox bg='grey-solid.1' py={{ xs: '8', _: 'md' }}>
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
                                    responsive={responsive(arr.length)}
                                    draggable
                                >
                                    {lives.map(renderLive)}
                                </SANCarousel>
                            </SANBox>
                        </SANLayoutContainer>
                    </SANBox>
                )
            }}
        </SANQuery>
    )
}

export default RMNexts
