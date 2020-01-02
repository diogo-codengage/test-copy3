import React from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import { space, SpaceProps } from 'styled-system'

import { SANTypography } from '../../Atoms/Typography'
import { SANProgress } from '../../Atoms/Progress'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANSkeleton } from '../../Atoms/Skeleton'
import { SANBox } from '../../Atoms/Box'

interface IWrapper extends React.HTMLProps<HTMLDivElement> {
    hasPointer?: boolean
}

const Wrapper = styled(SANBox)<IWrapper>`
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
            270deg,
            #099e7666,
            #099e7666,
            #099e76,
            #099e76
        );
    }
    ${ifProp(
        'hasPointer',
        css`
            cursor: pointer;
            &:hover {
                background-color: ${theme('colors.primary')};
            }
        `,
        css`
            cursor: default;
        `
    )};
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
}

export interface ISANChangeCourseProps {
    id: string
    title: string
    date: string
    loading?: boolean
    percent: number
    coverPicture: string
    onChange: (id: string) => void
    ContinueProps?: IContinue
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

const SANChangeCourse: React.FC<ISANChangeCourseProps> = ({
    title,
    id,
    date,
    percent,
    coverPicture,
    onChange,
    ContinueProps,
    loading,
    ...props
}) => {
    const { t } = useTranslation('components')
    const onClick = e => {
        e.stopPropagation()
        onChange && onChange(id)
    }

    return (
        <Wrapper
            position='relative'
            onClick={onClick}
            backgroundRepeat='no-repeat'
            backgroundPosition='center'
            backgroundSize='cover'
            backgroundImage={`url(${coverPicture})`}
            borderRadius={!!ContinueProps ? '0px' : 'base'}
            hasPointer={!ContinueProps}
            {...props}
        >
            <SANBox
                px={!!ContinueProps ? 'md' : 'sm'}
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
                        <SANTypography color='white.6' fontSize='sm'>{`${t(
                            'changeCourse.ends'
                        )} ${date}`}</SANTypography>
                    </SANBox>
                </SANSkeleton>
                {!!ContinueProps && (
                    <SANContinue loading={loading} {...ContinueProps} />
                )}
            </SANBox>
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
                {!ContinueProps && (
                    <SANEvaIcon
                        ml='xs'
                        size='medium'
                        name='arrow-forward-outline'
                        color='white.7'
                    />
                )}
            </SANBox>
        </Wrapper>
    )
}

export default SANChangeCourse
