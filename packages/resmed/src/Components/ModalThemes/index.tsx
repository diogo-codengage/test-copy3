import React from 'react'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter,
    SANBox,
    SANEvaIcon,
    SANScroll,
    SANSpin
} from '@sanar/components'

import { ISANModalProps } from '@sanar/components/dist/Components/Molecules/Modal'
import { ILastAccessed } from 'Apollo/Subspecialties/Queries/lessons'

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

const Item = ({ index, name, completed, status, onClick }) => {
    const { t } = useTranslation('resmed')

    return (
        <ItemStyled
            py='md'
            px='lg'
            pr='sm'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            blocked={status !== 'active'}
            onClick={status === 'active' && onClick}
            mr='xs'
        >
            <SANBox display='flex' alignItems='center'>
                <SANTypography
                    color={completed ? 'primary' : 'grey.5'}
                    fontSize='xs'
                    fontWeight='bold'
                    lineHeight='1'
                    mr='xs'
                >
                    {index}
                </SANTypography>
                <SANTypography fontSize='md' lineHeight='1'>
                    {status !== 'active' ? t('modalThemes.blocked') : name}
                </SANTypography>
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
}

interface ITheme {
    name: string
    completed?: boolean
    status?: string
}

interface IRMModalThemesProps extends ISANModalProps, RouteComponentProps {
    themes: ITheme[]
    visible: boolean
    loading: boolean
    title: string
    onCancel: () => void
    onContinue: () => void
}

const renderTheme = (theme, index, onClick) => {
    return (
        <Item
            {...theme}
            index={index + 1}
            key={index}
            onClick={() => onClick(theme.lastAccessed)}
        />
    )
}

const RMModalThemes = ({
    onContinue,
    themes,
    loading,
    history,
    ...props
}: IRMModalThemesProps) => {
    const { t } = useTranslation('resmed')

    const onClickItem = (lastAccessed: ILastAccessed) => {
        const {
            specialtyId,
            subSpecialtyId,
            lessonId,
            collectionId,
            resource
        } = lastAccessed

        history.push(
            `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${lessonId}/${collectionId}/${resource.type.toLocaleLowerCase()}/${
                resource.id
            }`
        )
    }

    return (
        <SANModal
            centered
            width={360}
            style={{ overflow: 'hidden' }}
            {...props}
        >
            <SANSpin spinning={loading}>
                <SANBox margin='-24px' mb='lg' py='sm' height={427}>
                    <SANScroll>
                        {themes.map((theme, index) =>
                            renderTheme(theme, index, onClickItem)
                        )}
                    </SANScroll>
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
            </SANSpin>
        </SANModal>
    )
}

export default withRouter(RMModalThemes)
