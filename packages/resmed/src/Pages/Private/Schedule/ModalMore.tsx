import React, { useCallback, useState } from 'react'

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

import { RMModalSchedule } from './Modal'

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
                viewed: theme('colors.primary-2'),
                unseen: theme('colors.burgundy.0'),
                live: theme('colors.grey.6'),
                exams: theme('colors.grey.6')
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

interface ISelect {
    visible: boolean
    item: IOption | any
}

export const RMModalMore = ({ options = [], date, ...props }: IRMModalMore) => {
    const { t } = useTranslation('resmed')
    const [selected, setSelect] = useState<ISelect>({
        visible: false,
        item: {}
    })

    const renderItem = useCallback(
        (option, index) => (
            <Wrapper
                key={index}
                borderTop={index === 0 ? '1px solid' : undefined}
                borderBottom={'1px solid'}
                borderColor='grey.1'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                py='sm'
                px='lg'
                status={option.status}
                onClick={() => setSelect({ visible: true, item: option })}
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
        []
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
            <RMModalSchedule
                visible={selected.visible}
                options={selected.item}
                onCancel={() => setSelect({ visible: false, item: undefined })}
            />
        </SANModal>
    )
}
