import React from 'react'
import styled, { css } from 'styled-components'

import { useTranslation } from 'react-i18next'

import { theme, prop } from 'styled-tools'

import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANRow, SANCol } from '../Grid'
import { SANTypography } from '../../Atoms/Typography'

import startQuizSvg from '../../../Assets//images/start-quiz/start-quiz.svg'

const SANRowStyled = styled(SANRow)`
    && {
        border-radius: ${theme('radii.base')};
        background-color: ${theme('colors.white.10')};
    }
`

const SANColStyled = styled(SANCol)`
    && {
        background-color: ${theme('colors.white.10')};
        border-radius: ${theme('radii.base')} 0 0 ${theme('radii.base')};
        padding: 56px 72px 46px 72px;

        ${theme('mediaQueries.down.md')} {
            border-radius: ${theme('radii.base')};
            padding: ${theme('space.xl')} ${theme('space.md')}
                ${theme('space.xl')} ${theme('space.md')};
        }
    }
`

const SANColImage = styled(SANCol)`
    && {
        position: relative;
        border-radius: 0 ${theme('radii.base')} ${theme('radii.base')} 0;
    }
`

const Badge = styled.div`
    color: ${theme('colors.primary')};
    border: 2px solid ${theme('colors.primary')};
    font-weight: bold;
    border-radius: 100vh;
    text-align: center;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2px;
`

const RowItem = styled.div`
    position: relative;
`

const SANBoxStyled = styled(SANBox)`
    && {
        position: fixed;
        z-index: 2;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0 -1px 2px ${theme('colors.grey.4')};
    }
`

const Accept = styled.div`
    padding: 0 40px;
    position: absolute;
    bottom: 56px;
`

const Background = styled.div<{ image: string }>`
    border-radius: 0 ${theme('radii.base')} ${theme('radii.base')} 0;
    position: absolute;
    background-image: url(${prop('image')});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

export interface ISANStartQuizProps {
    name: string
    image?: string
    ButtonProps?: ISANButtonProps
}

const arr = new Array(4).fill(1)

const renderItem = t => (_, index) => (
    <RowItem key={index}>
        <Badge>
            <SANTypography level={6} color='primary'>
                {index + 1}
            </SANTypography>
        </Badge>
        <SANTypography
            regular
            fontSize={{ md: '4', _: '3' }}
            mb='md'
            ml='xxl'
            color='grey.8'
        >
            {t(`startQuiz.pass${index + 1}`)}
        </SANTypography>
    </RowItem>
)

const SANStartQuiz = ({
    name,
    image = startQuizSvg,
    ButtonProps
}: ISANStartQuizProps) => {
    const { t } = useTranslation('components')
    return (
        <SANRowStyled type='flex'>
            <SANColStyled xs={24} sm={24} md={16} lg={17} xl={18}>
                <SANTypography
                    fontSize={{ md: '6', _: '4' }}
                    regular
                    mb='xl'
                    color='grey.8'
                >
                    {t('startQuiz.title', { name })}
                </SANTypography>
                <SANTypography variant='subtitle1' mb='xl' color='grey.6'>
                    {t('startQuiz.longDescription')}
                </SANTypography>
                <SANTypography variant='subtitle1' mb='xxl' color='grey.6'>
                    {t('startQuiz.shortDescription')}
                </SANTypography>

                {arr.map(renderItem(t))}
            </SANColStyled>
            <SANColImage xs={0} sm={0} md={8} lg={7} xl={6}>
                <Background image={image} />
                <Accept>
                    <SANTypography level={5} regular mb='xxl' color='grey.8'>
                        {t('startQuiz.question')}
                    </SANTypography>
                    <SANButton
                        color='primary'
                        size='large'
                        variant='solid'
                        uppercase
                        block
                        {...ButtonProps}
                    >
                        {t('startQuiz.button')}
                    </SANButton>
                </Accept>
            </SANColImage>

            <SANBoxStyled
                display={{ md: 'none', _: 'flex' }}
                alignItems='center'
                justifyContent='center'
                bg='grey-solid.8'
                py='sm'
            >
                <SANButton
                    px='8'
                    color='light'
                    size='small'
                    variant='outlined'
                    uppercase
                    {...ButtonProps}
                >
                    {t('startQuiz.start')}
                </SANButton>
            </SANBoxStyled>
        </SANRowStyled>
    )
}

export default SANStartQuiz
