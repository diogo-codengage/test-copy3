import React, {
    useCallback,
    useMemo,
    useState,
    useRef,
    useEffect,
    memo
} from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifNotProp, ifProp } from 'styled-tools'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Tooltip } from 'antd'

import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { SANButton } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANTypography } from '../../Atoms/Typography'
import { SANSkeleton } from '../../Atoms/Skeleton'

import { responsiveHorizontal, responsiveVertical } from './responsive'

const BRAND_HEADER_HEIGHT = '50px'

const arrLoading = new Array(7).fill(1)

const SkeletonImage = styled(SANSkeleton)`
    &&& {
        & div {
            padding: 0;
        }
        & span {
            width: 100%;
            border-radius: 4px;
            height: 92px;
        }
    }
`

const Skeleton = () => (
    <SANBox bg='grey.9' p='md'>
        <SANSkeleton title={{ width: '30%' }} paragraph={false} dark active />
        <SANBox my='xs'>
            <SkeletonImage title={false} paragraph={false} dark active avatar />
        </SANBox>
        <SANSkeleton title={{ width: '100%' }} paragraph={false} dark active />
    </SANBox>
)

const renderSkeleton = (_, index) => <Skeleton key={index} />

const NextArrow = ({ onClick, className, icon, disabled }: any) => (
    <ButtonArrowStyled
        onClick={onClick}
        circle
        variant='text'
        size='xsmall'
        className={className}
        disabled={disabled}
    >
        <SANEvaIcon name={!!icon ? icon : 'arrow-forward-outline'} />
    </ButtonArrowStyled>
)

const PrevArrow = ({ onClick, className, icon, disabled }: any) => (
    <ButtonArrowStyled
        onClick={onClick}
        circle
        variant='text'
        size='xsmall'
        className={className}
        disabled={disabled}
    >
        <SANEvaIcon name={!!icon ? icon : 'arrow-back-outline'} />
    </ButtonArrowStyled>
)

const ButtonArrowStyled = styled(SANButton)`
    &&& {
        position: absolute;
        background-color: ${theme('colors.white.10')};
        color: ${theme('colors.grey.6')};
        z-index: 1;

        &.slick-disabled,
        &.es-button__variant--text[disabled],
        &.es-button__variant--text[disabled]:hover {
            background-color: ${theme('colors.white.10')} !important;
            opacity: 0.4 !important;
            cursor: not-allowed;
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

const ImageStyled = styled(SANBox)`
    max-height: 120px;
`

const SANEvaIconStyled = styled(SANEvaIcon)``

const SANCollectionItemStyled = styled(SANBox)<{ current: boolean }>`
    &:hover {
        ${SANEvaIconStyled}, ${SANTypography}, ${ImageStyled} {
            opacity: 0.6;
        }
    }

    ${ifNotProp(
        'current',
        css`
            & ${SANEvaIconStyled}, & ${SANTypography}, & ${ImageStyled} {
                opacity: 0.4;
            }
        `
    )};
`

const IconComleted = styled(SANEvaIcon)<{ completed: boolean }>`
    && {
        position: absolute;
        top: calc(50% - 24px);
        left: calc(50% - 24px);
        color: ${ifProp(
            'completed',
            theme('colors.white.5'),
            theme('colors.white.10')
        )};

        & svg {
            font-size: ${theme('fontSizes.7')};
        }
    }
`

const SliderStyled = styled(Slider)`
    && {
        ${ifProp(
            'vertical',
            css`
                background-color: ${theme('colors.grey.9')};
            `
        )};
        &.slick-vertical .slick-slide {
            border: none;
        }

        ${ifProp(
            'vertical',
            css`
                width: 192px;
                max-height: 100%;
                overflow: hidden;
            `,
            css`
                & .slick-current ${SANCollectionItemStyled} {
                    border-top-left-radius: ${theme('radii.base')};
                    border-bottom-left-radius: ${theme('radii.base')};
                }
                & .slick-cloned ${SANCollectionItemStyled} {
                    border-top-right-radius: ${theme('radii.base')};
                    border-bottom-right-radius: ${theme('radii.base')};
                }
            `
        )}
    }
`

interface IProgress {
    video: number
    quiz: number
}

export interface ICollection {
    name: string
    image: string
    completed: boolean
    id: string
    progress: IProgress
}

export interface ISANCollectionProps {
    items: ICollection[]
    vertical?: boolean
    onChange?: (item: ICollection) => void
    value?: string
    loading?: boolean
}

export interface ISANCollectionItemProps {
    item: ICollection
    onChange: (item: ICollection) => void
    value: string
    index: number
}

const SANCollectionItem: React.FC<ISANCollectionItemProps> = ({
    item,
    index,
    onChange,
    value
}) => {
    const { t } = useTranslation('components')
    const { name, image, id, completed } = item

    const handleChange = () => onChange(item)

    const videoCompleted = useMemo(
        () => !!item && item.progress.video === 100,
        [item]
    )

    const videoIconProps = useMemo(
        () =>
            videoCompleted
                ? {
                      name: 'play-circle',
                      color: 'warning'
                  }
                : {
                      name: 'play-circle-outline',
                      color: 'white.10'
                  },
        [videoCompleted]
    )

    const quizCompleted = useMemo(() => !!item && item.progress.quiz === 100, [
        item
    ])

    const quizIconProps = useMemo(
        () =>
            quizCompleted
                ? {
                      name: 'edit-2',
                      color: 'warning'
                  }
                : {
                      name: 'edit-2-outline',
                      color: 'white.10'
                  },
        [quizCompleted]
    )

    return (
        <SANCollectionItemStyled
            bg='grey.9'
            current={value === id}
            position='relative'
        >
            <SANBox p='md'>
                <SANBox
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <SANTypography fontSize='sm' color='white.10'>
                        {t('collection.part')} {index}
                    </SANTypography>
                    <SANBox display='flex' alignItems='center'>
                        <Tooltip
                            title={
                                videoCompleted
                                    ? t('collection.progress.video.completed')
                                    : t('collection.progress.video.incomplete')
                            }
                            placement='topLeft'
                            mouseEnterDelay={0.3}
                        >
                            <SANEvaIconStyled {...videoIconProps} mr='xxs' />
                        </Tooltip>
                        <Tooltip
                            title={
                                videoCompleted
                                    ? t('collection.progress.quiz.completed')
                                    : t('collection.progress.quiz.incomplete')
                            }
                            placement='topLeft'
                            mouseEnterDelay={0.3}
                        >
                            <SANEvaIconStyled {...quizIconProps} />
                        </Tooltip>
                    </SANBox>
                </SANBox>
                <SANBox
                    position='relative'
                    onClick={handleChange}
                    style={{ cursor: 'pointer' }}
                >
                    <ImageStyled
                        as='img'
                        src={image}
                        my='xxs'
                        borderRadius='base'
                        width='100%'
                    />
                    {completed && (
                        <IconComleted
                            name='checkmark-circle-2'
                            completed={completed && value === id}
                        />
                    )}
                </SANBox>
                <Tooltip title={name} placement='topLeft' mouseEnterDelay={0.3}>
                    <SANTypography
                        fontSize='md'
                        fontWeight='bold'
                        ellipsis
                        color='white.10'
                        onClick={handleChange}
                        style={{ cursor: 'pointer' }}
                    >
                        {name}
                    </SANTypography>
                </Tooltip>
            </SANBox>
            {value === id && (
                <SANBox
                    bg='warning'
                    height='4px'
                    borderRadius='base'
                    position='absolute'
                    bottom='0'
                    width='100%'
                />
            )}
        </SANCollectionItemStyled>
    )
}

const SANCollection = memo<ISANCollectionProps>(
    ({ items, vertical, onChange, value, loading = false }) => {
        const { width } = useWindowSize()
        const [isDragging, setIsDragging] = useState(false)
        const [curretSlide, setCurrentSlide] = useState(0)
        const sliderRef = useRef<any>()

        const handlePrev = () => {
            if (!!sliderRef && !!sliderRef.current) {
                sliderRef.current.slickPrev()
            }
        }

        const handleNext = () => {
            if (!!sliderRef && !!sliderRef.current) {
                sliderRef.current.slickNext()
            }
        }

        const renderItem = useCallback(
            (item, index) => (
                <SANCollectionItem
                    onChange={onChange}
                    value={value}
                    item={item}
                    index={index + 1}
                    key={index}
                />
            ),
            [value]
        )

        const index = useMemo(
            () => items.findIndex(item => item.id === value),
            [items, value]
        )

        const settings = useMemo(
            () => ({
                focusOnSelect: true,
                swipe: true,
                swipeToSlide: true,
                draggable: true,
                dots: false,
                infinite: false,
                beforeChange: () => setIsDragging(true),
                afterChange: current => {
                    setIsDragging(false)
                    setCurrentSlide(current)
                },
                slidesToScroll: 1,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
                verticalSwiping: vertical,
                arrows: !vertical,
                vertical,
                responsive: vertical ? responsiveVertical : responsiveHorizontal
            }),
            [vertical, items]
        )

        const key = useMemo(() => `san-collection-${new Date().getTime()}`, [
            vertical
        ])

        //Equals responsiveVertical slidesToShow for each resolution
        const disabledNext = useMemo(() => {
            if (!vertical) return
            if (width <= 1366) {
                return curretSlide + 3 >= items.length
            } else if (width <= 1920) {
                return curretSlide + 4 >= items.length
            } else {
                return curretSlide + 5 >= items.length
            }
        }, [curretSlide, width, items])

        useEffect(() => {
            if (!!sliderRef && !!sliderRef.current && index > 0) {
                sliderRef.current.slickGoTo(index)
                setCurrentSlide(index)
            }
        }, [index])

        return (
            <SANBox
                position='relative'
                height={
                    vertical
                        ? {
                              classroom: '100vh',
                              _: `calc(100vh - ${BRAND_HEADER_HEIGHT})`
                          }
                        : 'auto'
                }
            >
                {vertical && (
                    <>
                        <SANBox
                            position='absolute'
                            left='calc(50% - 16px)'
                            top='12px'
                        >
                            <PrevArrow
                                disabled={curretSlide === 0}
                                icon='arrow-upward-outline'
                                onClick={handlePrev}
                            />
                        </SANBox>
                        <SANBox
                            position='absolute'
                            left='calc(50% - 16px)'
                            bottom='34px'
                        >
                            <NextArrow
                                disabled={disabledNext}
                                icon='arrow-downward-outline'
                                onClick={handleNext}
                            />
                        </SANBox>
                    </>
                )}
                <SliderStyled ref={sliderRef} key={key} {...settings}>
                    {loading
                        ? arrLoading.map(renderSkeleton)
                        : items.map(renderItem)}
                </SliderStyled>
            </SANBox>
        )
    }
)

export default SANCollection
