import React, { useMemo } from 'react'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANDivider } from '../../Atoms/Divider'
import { SANProgress } from '../../Atoms/Progress'

interface IProgress {
    me: number
    others: number
}

interface IContinue {
    title: string
    index: number
}

export interface ISANCardSubSpecialtyProps {
    blocked?: boolean
    title: string
    progress: IProgress
    continue: IContinue
    onClickRight: () => void
    onClickLeft: () => void
}

const FooterStyled = styled(SANBox)<{ blocked?: boolean }>`
    border-top: 1px solid ${theme('colors.grey.2')};
    ${ifProp(
        'blocked',
        css`
            visibility: hidden;
        `
    )}
`

const ContinueStyled = styled(SANBox)<{ blocked?: boolean }>`
    ${ifProp(
        'blocked',
        css`
            visibility: hidden;
        `
    )}
`

const BlockedStyled = styled(SANBox)`
    position: absolute;
    width: 100%;
    height: 100%;

    &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: ${theme('colors.white.5')};
        z-index: 2;
    }
`

const TitleProgress = props => (
    <SANTypography
        fontSize='xs'
        color='grey.6'
        transform='uppercase'
        minWidth='52px'
        {...props}
    />
)

const Blocked = () => {
    const { t } = useTranslation('components')
    const {
        assets: {
            cardSubSpecialty: { blocked }
        }
    } = useThemeContext()

    const flexProps = useMemo(
        () => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3
        }),
        []
    )

    return (
        <BlockedStyled {...flexProps}>
            <SANBox
                {...flexProps}
                flexDirection='column'
                position='absolute'
                bottom='md'
            >
                <SANBox as='img' src={blocked} mb='xs' zIndex={3} />
                <SANTypography fontSize='lg' fontWeight='bold' color='grey.8'>
                    {t('cardSubSpecialty.comingSoon')}
                </SANTypography>
            </SANBox>
        </BlockedStyled>
    )
}

const SANCardSubSpecialty = ({
    blocked,
    title,
    progress,
    continue: continueProp,
    onClickRight,
    onClickLeft
}: ISANCardSubSpecialtyProps) => {
    const { t } = useTranslation('components')

    const progressProps = useMemo(
        () => ({
            showInfo: true,
            backdrop: 'grey.1',
            InfoProps: {
                color: 'grey.6',
                fontSize: 'sm'
            }
        }),
        []
    )

    return (
        <SANBox
            boxShadow='1'
            borderRadius='base'
            bg='white.10'
            position='relative'
        >
            {blocked && <Blocked />}
            <SANBox
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                p='md'
            >
                <SANTypography fontWeight='bold' fontSize='lg'>
                    {title}
                </SANTypography>

                <SANBox zIndex={1} width='100%' mt='md'>
                    <SANBox display='flex' alignItems='center' mb='xs'>
                        <TitleProgress>
                            {t('cardSubSpecialty.you')}
                        </TitleProgress>
                        <SANProgress
                            color='primary-3'
                            percent={blocked ? 0 : progress.me}
                            {...progressProps}
                        />
                    </SANBox>
                    <SANBox display='flex' alignItems='center'>
                        <TitleProgress>
                            {t('cardSubSpecialty.others')}
                        </TitleProgress>
                        <SANProgress
                            color='grey-solid.5'
                            percent={blocked ? 0 : progress.others}
                            {...progressProps}
                        />
                    </SANBox>
                </SANBox>
                <SANDivider bg='grey.2' mt='xl' mb='md' />

                <ContinueStyled
                    display='flex'
                    alignItems='center'
                    blocked={blocked}
                >
                    <SANBox
                        mr='xs'
                        borderRadius='base'
                        bg='grey-solid.6'
                        width='36px'
                        height='36px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <SANTypography
                            color='white.10'
                            fontSize='lg'
                            fontWeight='bold'
                        >
                            {continueProp.index}
                        </SANTypography>
                    </SANBox>
                    <SANBox>
                        <SANTypography
                            fontSize='xs'
                            color='grey.5'
                            transform='uppercase'
                        >
                            {t('cardSubSpecialty.startWith')}
                        </SANTypography>
                        <SANTypography color='grey.7'>
                            {continueProp.title}
                        </SANTypography>
                    </SANBox>
                </ContinueStyled>
            </SANBox>
            <FooterStyled
                display='flex'
                justifyContent='space-between'
                p='md'
                blocked={blocked}
            >
                <SANButton
                    size='xsmall'
                    variant='text'
                    color='primary'
                    uppercase
                    bold
                    onClick={onClickLeft}
                >
                    {continueProp.index === 1
                        ? t('cardSubSpecialty.start')
                        : t('cardSubSpecialty.continue')}
                </SANButton>
                <SANButton
                    size='xsmall'
                    variant='text'
                    uppercase
                    bold
                    onClick={onClickRight}
                >
                    {t('cardSubSpecialty.seeClasses')}
                </SANButton>
            </FooterStyled>
        </SANBox>
    )
}

export default SANCardSubSpecialty
