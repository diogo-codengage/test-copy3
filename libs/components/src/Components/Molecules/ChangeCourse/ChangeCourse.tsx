import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifProp, prop } from 'styled-tools'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANTypography } from '../../Atoms/Typography'
import { SANProgress } from '../../Atoms/Progress'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANSkeleton } from '../../Atoms/Skeleton'
import { SANBox, ISANBoxProps } from '../../Atoms/Box'

import { transparentize } from 'polished'

interface IWrapper {
    hasHover?: boolean
    cursor?: 'not-allowed' | 'pointer' | 'default'
}

const Wrapper = styled(SANBox)<IWrapper>`
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
            270deg,
            ${({ theme }) => transparentize('0.4', theme.colors.primary)},
            ${({ theme }) => transparentize('0.4', theme.colors.primary)},
            ${theme('colors.primary')},
            ${theme('colors.primary')}
        );
    }
    cursor: ${prop('cursor')};
    ${ifProp(
        'hasHover',
        css`
            &:hover {
                background-color: ${theme('colors.primary')};
            }
        `
    )};

    ${theme('mediaQueries.down.sm')} {
        background-size: 100% calc(100% - 1px);
    }
`

const WrapperContinue = styled(SANBox)`
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${theme('colors.white.10')};
    }
`

interface IContinue {
    onClick: () => void
    title: string
    subtitle: string
    loading?: boolean
}

export interface ISANChangeCourseProps extends Pick<ISANBoxProps, 'mb'> {
    id: string
    title: string
    date: string
    loading?: boolean
    percent: number
    coverPicture: string
    onChange?: (id: string) => void
    ContinueProps?: IContinue
    hasActive?: boolean
    expired?: boolean
    notStarted?: boolean
    BoxProps?: ISANBoxProps
}

export interface ISANContinueProps extends IContinue {
    loading?: boolean
}

const SANContinue: React.FC<ISANContinueProps> = ({
    onClick,
    subtitle,
    title,
    loading
}) => (
    <WrapperContinue
        onClick={onClick}
        borderRadius='base'
        bg='white.8'
        p='sm'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mt='lg'
    >
        <SANSkeleton
            active
            paragraph={false}
            title={{ width: '80%' }}
            loading={loading}
        >
            <SANBox width='calc(100% - 35px)'>
                <SANTypography fontSize='sm' color='grey.5' ellipsis>
                    {title}
                </SANTypography>
                <SANTypography
                    fontWeight='bold'
                    fontSize='sm'
                    color='grey.7'
                    ellipsis
                >
                    {subtitle}
                </SANTypography>
            </SANBox>

            <SANEvaIcon name='play-circle' size='xlarge' />
        </SANSkeleton>
    </WrapperContinue>
)

const Blocked = () => {
    const {
        assets: {
            cardSubSpecialty: { blocked }
        }
    } = useThemeContext()

    return (
        <SANBox
            display='flex'
            justifyContent='center'
            alignItems='center'
            position='absolute'
            width='100%'
            bottom='0'
        >
            <SANBox
                as='img'
                src={blocked}
                mb='xs'
                zIndex={3}
                width={30}
                height={30}
            />
        </SANBox>
    )
}

const SANChangeCourse: React.FC<ISANChangeCourseProps> = ({
    title,
    id,
    date,
    percent,
    coverPicture,
    onChange,
    ContinueProps,
    loading,
    hasActive,
    expired,
    notStarted,
    BoxProps
}) => {
    const { t } = useTranslation('components')

    const onClick = e => {
        e.stopPropagation()
        if (expired || notStarted) return
        !!onChange && onChange(id)
    }

    return (
        <Wrapper
            position='relative'
            onClick={onClick}
            backgroundRepeat='no-repeat'
            backgroundPosition='center'
            backgroundSize='cover'
            backgroundImage={`url(${coverPicture})`}
            borderRadius={hasActive ? '0px' : 'base'}
            opacity={expired || notStarted ? 0.7 : 1}
            hasHover={!ContinueProps}
            cursor={
                expired || notStarted
                    ? 'not-allowed'
                    : !ContinueProps
                    ? 'pointer'
                    : 'default'
            }
            height={(expired || notStarted ? 106 : 'auto') as any}
            {...props}
        >
            {(expired || notStarted) && <Blocked />}
            <SANBox
                px={hasActive ? 'md' : 'sm'}
                pt={!!ContinueProps ? 'xl' : 'md'}
                pb={!!ContinueProps ? 'xxl' : 'md'}
                position='inherit'
            >
                <SANSkeleton
                    paragraph={false}
                    title={{ width: '90%' }}
                    active
                    dark
                    loading={loading}
                >
                    <SANBox display='flex' flexDirection='column'>
                        <SANTypography
                            fontSize='lg'
                            ellipsis
                            fontWeight='bold'
                            color='white.10'
                        >
                            {title}
                        </SANTypography>
                        <SANTypography color='white.6' fontSize='sm'>{`${
                            expired
                                ? t('changeCourse.finished')
                                : notStarted
                                ? t('changeCourse.notStarted')
                                : t('changeCourse.ends')
                        } ${date}`}</SANTypography>
                    </SANBox>
                </SANSkeleton>
                {!!ContinueProps && <SANContinue {...ContinueProps} />}
            </SANBox>
            {!expired && !notStarted && (
                <SANBox
                    display='flex '
                    alignItems='center'
                    px='md'
                    py='xs'
                    bg='grey.5'
                    position='inherit'
                >
                    <SANProgress
                        showInfo
                        color='warning'
                        percent={percent}
                        InfoProps={{ color: 'warning' }}
                        height={4}
                    />
                    {!hasActive && (
                        <SANEvaIcon
                            ml='xs'
                            size='medium'
                            name='arrow-forward-outline'
                            color='white.7'
                        />
                    )}
                </SANBox>
            )}
        </Wrapper>
    )
}

export default SANChangeCourse
