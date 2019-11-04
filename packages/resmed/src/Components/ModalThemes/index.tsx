import React from 'react'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter,
    SANBox,
    SANEvaIcon,
    SANScroll
} from '@sanar/components'

import { ISANModalProps } from '@sanar/components/dist/Components/Molecules/Modal'

const ItemStyled = styled(SANBox)<{ blocked?: boolean }>`
    &:nth-child(even) {
        background-color: ${theme('colors.grey-solid.1')};
    }

    ${ifProp(
        'blocked',
        css`
            opacity: 0.5;
            cursor: not-allowed;
        `,
        css`
            &:hover {
                background-color: ${theme('colors.grey-solid.2')};
            }
            cursor: pointer;
        `
    )}
`

const Item = ({ index, name, completed, blocked }) => (
    <ItemStyled
        py='md'
        px='lg'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        blocked={blocked}
    >
        <SANBox display='flex' alignItems='center'>
            <SANTypography
                color={!blocked && 'primary'}
                fontSize='xs'
                fontWeight='bold'
                mr='xs'
            >
                {index}
            </SANTypography>
            <SANTypography fontSize='md'>{name}</SANTypography>
        </SANBox>
        {completed ? (
            <SANEvaIcon
                name='checkmark-circle-2'
                color='primary'
                size='large'
            />
        ) : (
            <SANEvaIcon name='arrow-ios-forward-outline' size='large' />
        )}
    </ItemStyled>
)

interface ITheme {
    name: string
    completed?: boolean
    blocked?: boolean
}

interface IRMModalThemesProps extends ISANModalProps {
    themes: ITheme[]
    onContinue: () => void
}

const renderTheme = (theme, index) => <Item {...theme} index={index + 1} />

const RMModalThemes = ({
    onContinue,
    themes,
    ...props
}: IRMModalThemesProps) => {
    const { t } = useTranslation('resmed')

    return (
        <SANModal
            centered
            width={360}
            style={{ overflow: 'hidden' }}
            {...props}
        >
            <SANBox margin='-24px' mb='lg' py='sm' height={427}>
                <SANScroll>{themes.map(renderTheme)}</SANScroll>
            </SANBox>
            <SANModalFooter
                justifyContent='center'
                borderTop='1px solid'
                borderColor='grey.2'
                margin='-24px'
                padding='sm'
            >
                <SANButton
                    size='small'
                    variant='text'
                    color='primary'
                    uppercase
                    bold
                    onClick={onContinue}
                >
                    {t('modalThemes.continue')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

export default RMModalThemes
