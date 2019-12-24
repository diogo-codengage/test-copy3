import React from 'react'

import styled from 'styled-components'
import { theme, prop } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANProgress } from '../../Atoms/Progress'

interface IProgress {
    me: number
    others: number
}

export interface ISANCardSpecialtyProps {
    image: string
    title: string
    disabled?: boolean
    progress: IProgress
    onClick: () => void
}

interface IStyled {
    image: string
}

const SANCardSpecialtyStyled = styled(SANBox)<IStyled>`
    background-image: url(${prop('image')});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: ${theme('radii.base')};
    position: relative;

    &:before {
        content: '';
        border-radius: ${theme('radii.base')};
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: linear-gradient(
            0deg,
            ${theme('colors.grey.9')},
            ${theme('colors.grey.4')}
        );
    }
`

const TitleStyled = styled(SANTypography)`
    white-space: nowrap;
`

const TitleProgress = props => (
    <SANTypography
        fontSize='xs'
        color='white.8'
        transform='uppercase'
        minWidth='52px'
        {...props}
    />
)

const SANCardSpecialty = ({
    image,
    title,
    progress,
    disabled,
    onClick
}: ISANCardSpecialtyProps) => {
    const { t } = useTranslation('components')
    return (
        <SANCardSpecialtyStyled
            image={image}
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='space-between'
            px='lg'
            pb={{ xs: 'xl', _: 'md' }}
            pt={{ xs: 8, _: 'md' }}
        >
            <SANTypography
                fontSize={{ xs: 'xxl', _: 'lg' }}
                fontWeight='bold'
                lineHeight='1'
                textAlign='center'
                color='white.10'
                ellipsis={{ rows: 2 }}
                width='calc(100% - 1px)'
                height='72px'
                zIndex={1}
            >
                {title}
            </SANTypography>
            <SANBox zIndex={1} width='100%' mb='xl' mt={8}>
                <SANBox display='flex' alignItems='center' mb='xs'>
                    <TitleProgress>{t('cardSpecialty.you')}</TitleProgress>
                    <SANProgress
                        color='primary-3'
                        percent={progress.me}
                        showInfo
                    />
                </SANBox>
                <SANBox display='flex' alignItems='center'>
                    <TitleProgress>{t('cardSpecialty.others')}</TitleProgress>
                    <SANProgress
                        color='white.10'
                        percent={progress.others}
                        showInfo
                    />
                </SANBox>
            </SANBox>
            <SANButton
                onClick={onClick}
                uppercase
                bold
                variant='outlined'
                size='small'
                color='light'
                disabled={disabled}
            >
                {disabled
                    ? t('cardSpecialty.comingSoon')
                    : t('cardSpecialty.access')}
            </SANButton>
        </SANCardSpecialtyStyled>
    )
}

export default SANCardSpecialty
