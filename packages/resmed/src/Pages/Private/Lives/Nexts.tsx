import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANButton,
    SANLayoutContainer,
    SANSessionTitle,
    SANBox,
    SANTypography,
    SANCarousel
} from '@sanar/components'

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
                    {t('lives.nexts.seeLive')}
                </SANButton>
            </SANBox>
        </SANBox>
    )
}

const RMNexts = () => {
    const { t } = useTranslation('resmed')

    const renderLive = useCallback(
        e => (
            <RMCardNextLive
                key={e}
                title={'Live de Correção da prova SUS-SP 2019 '}
                subtitle={'27/04/2019 às 10h'}
            />
        ),
        []
    )

    return (
        <SANLayoutContainer>
            <SANSessionTitle title={t('lives.nexts.title')} />
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
                    {arr.map(renderLive)}
                </SANCarousel>
            </SANBox>
        </SANLayoutContainer>
    )
}

export default RMNexts
