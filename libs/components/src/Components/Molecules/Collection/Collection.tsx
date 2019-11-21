import React, { useCallback, useMemo, useState, useRef } from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifNotProp, ifProp } from 'styled-tools'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { SANButton } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANTypography } from '../../Atoms/Typography'

import { responsiveHorizontal, responsiveVertical } from './responsive'

const NextArrow = ({ onClick, className }: any) => (
    <ButtonArrowStyled
        onClick={onClick}
        circle
        variant='text'
        className={className}
    >
        <SANEvaIcon name='arrow-forward-outline' />
    </ButtonArrowStyled>
)

const PrevArrow = ({ onClick, className }: any) => (
    <ButtonArrowStyled
        onClick={onClick}
        circle
        variant='text'
        className={className}
    >
        <SANEvaIcon name='arrow-back-outline' />
    </ButtonArrowStyled>
)

const ButtonArrowStyled = styled(SANButton)`
    &&& {
        background-color: ${theme('colors.white.10')};
        color: ${theme('colors.grey.6')};
        z-index: 1;

        &.slick-disabled {
            opacity: 0.4;
        }

        &.slick-prev {
            left: -20px;
        }
        &.slick-next {
            right: -20px;
        }

        &.slick-prev,
        &.slick-next {
            &:focus:not(.slick-disabled),
            &:hover:not(.slick-disabled) {
                color: ${theme('colors.grey.6')} !important;
                background-color: ${theme('colors.white.6')} !important;
            }
        }
    }
`

const ImageStyled = styled(SANBox)``

const SANCollectionItemStyled = styled(SANBox)<{ current: boolean }>`
    cursor: pointer;

    &:hover {
        ${SANTypography}, ${ImageStyled} {
            opacity: 0.6;
        }
    }

    ${ifNotProp(
        'current',
        css`
            & ${SANTypography}, & ${ImageStyled} {
                opacity: 0.4;
            }
        `,
        css`
            border-bottom: 4px solid ${theme('colors.warning')};
        `
    )};
`

const IconComleted = styled(SANEvaIcon)`
    && {
        position: absolute;
        top: calc(50% - 24px);
        left: calc(50% - 24px);
        color: ${theme('colors.white.10')};

        & svg {
            font-size: ${theme('fontSizes.7')};
        }
    }
`

const SliderStyled = styled(Slider)`
    && {
        &.slick-vertical .slick-slide {
            border: none;
        }

        ${ifProp(
            'vertical',
            css`
                width: 192px;
                max-height: 100vh;
                overflow: hidden;
            `,
            css`
                & .slick-active:first-child ${SANCollectionItemStyled} {
                    border-top-left-radius: ${theme('radii.base')};
                    border-bottom-left-radius: ${theme('radii.base')};
                }
                & .slick-active:nth-child(5) ${SANCollectionItemStyled} {
                    border-top-right-radius: ${theme('radii.base')};
                    border-bottom-right-radius: ${theme('radii.base')};
                }
            `
        )}
    }
`

interface ICollection {
    name: string
    image: string
    completed: boolean
    id: string
}

export interface ISANCollectionProps {
    items: ICollection[]
    vertical?: boolean
    onChange?: (item: ICollection) => void
    value?: string
}

const SANCollectionItem = ({
    item,
    index,
    onChange,
    value,
    isDragging
}: any) => {
    const { t } = useTranslation('components')
    const { name, image, id, completed } = item

    const handleChange = e => {
        if (isDragging) {
            e.preventDefault()
            e.stopPropagation()
            // return
        }
        onChange(item)
    }

    return (
        <SANCollectionItemStyled
            bg='grey.9'
            p='md'
            pb={value === id ? 'sm' : 'md'}
            current={value === id}
            onClick={handleChange}
        >
            <SANTypography fontSize='sm' color='white.10'>
                {t('collection.part')} {index}
            </SANTypography>
            <SANBox position='relative'>
                <ImageStyled
                    as='img'
                    src={image}
                    my='xxs'
                    borderRadius='base'
                    width='100%'
                />
                {completed && value !== id && (
                    <IconComleted name='checkmark-circle-2' />
                )}
            </SANBox>
            <SANTypography
                fontSize='md'
                fontWeight='bold'
                ellipsis
                color='white.10'
            >
                {name}
            </SANTypography>
        </SANCollectionItemStyled>
    )
}

const SANCollection: React.FC<ISANCollectionProps> = ({
    items,
    vertical,
    onChange,
    value
}) => {
    const [isDragging, setIsDragging] = useState(false)
    const sliderRef = useRef<any>()

    const renderItem = useCallback(
        (item, index) => (
            <SANCollectionItem
                isDragging={isDragging}
                onChange={onChange}
                value={value}
                item={item}
                index={index + 1}
                key={index}
            />
        ),
        [value, isDragging]
    )

    const settings = useMemo(
        () => ({
            dots: false,
            infinite: false,
            beforeChange: () => setIsDragging(true),
            afterChange: () => setIsDragging(false),
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            verticalSwiping: vertical,
            arrows: !vertical,
            slidesToShow: vertical ? 6 : 5,
            vertical,
            responsive: vertical ? responsiveVertical : responsiveHorizontal
        }),
        [vertical]
    )

    const key = useMemo(() => `san-collection-${new Date().getTime()}`, [
        vertical
    ])

    return (
        <SliderStyled ref={sliderRef} key={key} {...settings}>
            {items.map(renderItem)}
        </SliderStyled>
    )
}

export default SANCollection
