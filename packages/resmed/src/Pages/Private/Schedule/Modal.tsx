import React, { useMemo, useCallback } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme, switchProp } from 'styled-tools'

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

import { IAppointment } from 'Apollo/Schedule/Queries/appointments'

type IStatus = 'viewed' | 'unseen' | 'live' | 'exams'

export interface IOption extends Partial<IAppointment> {
    status: IStatus
    title: string
    subtitle: string
    description: string
}

const defaultOption: IOption = {
    status: 'unseen',
    title: '',
    subtitle: '',
    description: ''
}

const SANTypographyStyled = styled(SANTypography)<{ status: IStatus }>`
    && {
        &:before {
            content: '';
            width: 6px;
            height: 6px;
            background-color: ${switchProp('status', {
                viewed: theme('colors.primary-4'),
                unseen: theme('colors.burgundy.1'),
                live: theme('colors.grey.4'),
                exams: theme('colors.blue.2')
            })};
            border-radius: 3px;
            position: absolute;
            top: 8px;
            left: 0;
        }
    }
`

const Wrapper = styled(SANBox)<{ status: IStatus }>`
    && {
        cursor: pointer;
        &:hover {
            background-color: ${theme('colors.grey.0')};
            &:first-child {
                border-top-left-radius: ${theme('radii.base')};
                border-top-right-radius: ${theme('radii.base')};
            }
            &:last-of-type {
                border-bottom-left-radius: ${theme('radii.base')};
                border-bottom-right-radius: ${theme('radii.base')};
            }
        }
    }
`

interface IRMModalMore extends ISANModalProps {
    options: IOption[]
}

export const RMModalMore = ({ options = [], ...props }: IRMModalMore) => {
    const { t } = useTranslation('resmed')

    const renderItem = useCallback(
        (option, index) => (
            <Wrapper
                key={index}
                borderBottom={index < options.length - 1 && '1px solid'}
                borderColor='grey.1'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                p='sm'
                status={option.status}
                mr='sm'
            >
                <SANBox pl='sm' position='relative' width='calc(100% - 20px)'>
                    <SANTypographyStyled
                        status={option.status}
                        fontSize='lg'
                        color='grey.7'
                        ellipsis
                    >
                        {option.title}
                    </SANTypographyStyled>
                    <SANTypography fontSize='xs' color='grey.5' mt='xxs'>
                        {option.subtitle}
                    </SANTypography>
                </SANBox>
                <SANEvaIcon name='arrow-ios-forward-outline' />
            </Wrapper>
        ),
        [options]
    )

    return (
        <SANModal
            width={360}
            title={`${t('schedule.modal.day')} ${new Date().getDay()}`}
            centered
            {...props}
        >
            <SANBox height={350}>
                <SANScroll>{options.map(renderItem)}</SANScroll>
            </SANBox>
        </SANModal>
    )
}

interface IRMModalSuggestion extends ISANModalProps {
    onConfirm: () => void
    checked: boolean
}

export const RMModalSuggestion = ({
    onConfirm,
    checked,
    ...props
}: IRMModalSuggestion) => {
    const { t } = useTranslation('resmed')

    return (
        <SANModal
            width={436}
            title={t('schedule.modal.suggestion.title')}
            centered
            onCancel={() => props.onCancel(checked)}
            {...props}
        >
            <SANTypography fontSize='lg' color='grey.7' mb='xl'>
                {t(
                    `schedule.modal.suggestion.${
                        checked ? 'descriptionEnable' : 'descriptionDisable'
                    }`
                )}
            </SANTypography>
            <SANModalFooter>
                <SANButton
                    size='small'
                    mr='md'
                    variant='text'
                    color='primary'
                    uppercase
                    bold
                    onClick={onConfirm}
                >
                    {t('schedule.modal.suggestion.confirm')}
                </SANButton>
                <SANButton
                    size='small'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={() => props.onCancel(checked)}
                >
                    {t('schedule.modal.suggestion.back')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

interface IRMModalSchedule extends ISANModalProps, RouteComponentProps {
    onClick: () => void
    options: IOption
}

const types = ['viewed', 'unseen', 'live']

export const RMModalSchedule = withRouter(
    ({
        options = defaultOption,
        onClick,
        history,
        ...props
    }: IRMModalSchedule) => {
        const { t } = useTranslation('resmed')

        const handleClick = () => {
            if (!!options && !!options.accessContent) {
                const {
                    specialtyId,
                    subSpecialtyId,
                    lesson,
                    collectionId,
                    resource
                } = options.accessContent

                if (!!options.resource && options.resource.type === 'Level') {
                    const final = `${
                        lesson.id
                    }/${collectionId}/${resource.type.toLocaleLowerCase()}/${
                        resource.id
                    }`
                    if (!!subSpecialtyId) {
                        history.push(
                            `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${final}`
                        )
                    } else {
                        history.push(
                            `/inicio/sala-aula/${specialtyId}/${final}`
                        )
                    }
                }
            }
        }

        const title = useMemo(() => {
            switch (options.status) {
                case 'viewed' || 'unseen':
                    return t('schedule.modal.lesson.title')
                case 'live':
                    return t('schedule.modal.live.title')
                default:
                    return t('schedule.modal.lesson.title')
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [options])

        const button = useMemo(() => {
            switch (options.status) {
                case 'viewed':
                    return t('schedule.modal.lesson.watched')
                case 'unseen':
                    return t('schedule.modal.lesson.watch')
                case 'live':
                    return t('schedule.modal.live.button')
                default:
                    return t('schedule.modal.lesson.watch')
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [options])

        if (!types.includes(options.status)) return null

        return (
            <SANModal width={360} title={title} centered {...props}>
                <SANBox>
                    <SANTypography fontSize='lg' color='grey.7'>
                        {options.title}
                    </SANTypography>
                    <SANTypography
                        fontSize='xs'
                        color='grey.5'
                        mt='xxs'
                        mb='md'
                    >
                        {options.subtitle}
                    </SANTypography>
                    <SANBox height={80}>
                        <SANScroll>
                            <SANTypography fontSize='md' color='grey.6' pr='sm'>
                                {options.description}
                            </SANTypography>
                        </SANScroll>
                    </SANBox>
                </SANBox>
                <SANBox
                    borderTop='1px solid'
                    borderColor='grey.1'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    p='md'
                    mt='xl'
                    mb='-24px'
                    mx='-24px'
                >
                    <SANButton
                        onClick={handleClick}
                        size='xsmall'
                        variant='text'
                        color='primary'
                        uppercase
                        bold
                    >
                        {options.status === 'viewed' && (
                            <SANEvaIcon
                                name='checkmark-circle-2'
                                mr='xs'
                                size='large'
                            />
                        )}
                        {button}
                    </SANButton>
                </SANBox>
            </SANModal>
        )
    }
)
