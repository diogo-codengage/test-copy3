import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme, switchProp } from 'styled-tools'

import {
    SANTypography,
    SANModal,
    SANBox,
    SANEvaIcon,
    SANScroll
} from '@sanar/components'

import { IAppointment } from 'Apollo/Schedule/Queries/appointments'

type IStatus = 'viewed' | 'unseen' | 'live' | 'exams'

export interface IOption extends Partial<IAppointment> {
    status: IStatus
    title: string
    subtitle: string
    description: string
}

interface IModalProps {
    onCancel: () => void
    visible: boolean
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

interface IRMModalMore extends IModalProps {
    options: IOption[]
    date: Date
}

export const RMModalMore = ({ options = [], date, ...props }: IRMModalMore) => {
    const { t } = useTranslation('resmed')

    const renderItem = useCallback(
        (option, index) => (
            <Wrapper
                key={index}
                borderBottom={
                    index < options.length - 1 ? '1px solid' : undefined
                }
                borderColor='grey.1'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                py='sm'
                px='lg'
                status={option.status}
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
            title={`${t('schedule.modal.day')} ${date.getDate()}`}
            centered
            {...props}
        >
            <SANBox height={350} mx='-24px'>
                <SANScroll>{options.map(renderItem)}</SANScroll>
            </SANBox>
        </SANModal>
    )
}
