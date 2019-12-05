import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter,
    SANBox,
    SANEvaIcon
} from '@sanar/components'

export const RMModalSuggestion = ({ onConfirm, checked, ...props }) => {
    const { t } = useTranslation('resmed')

    return (
        <SANModal
            width={436}
            title={t('schedule.modal.suggestion.title')}
            centered
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
                    onClick={props.onCancel}
                >
                    {t('schedule.modal.suggestion.back')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

export const RMModalSchedule = ({ options, onClick, ...props }) => {
    const { t } = useTranslation('resmed')

    const title = useMemo(() => {
        switch (options.type) {
            case 'lesson':
                return t('schedule.modal.lesson.title')
            case 'live':
                return t('schedule.modal.live.title')
            default:
                return t('schedule.modal.lesson.title')
        }
    }, [options])

    const button = useMemo(() => {
        switch (options.type) {
            case 'lesson':
                return options.completed
                    ? t('schedule.modal.lesson.watched')
                    : t('schedule.modal.lesson.watch')
            case 'live':
                return t('schedule.modal.live.button')
            default:
                return options.completed
                    ? t('schedule.modal.lesson.watched')
                    : t('schedule.modal.lesson.watch')
        }
    }, [options])

    return (
        <SANModal width={360} title={title} centered {...props}>
            <SANBox>
                <SANTypography fontSize='lg' color='grey.7'>
                    {options.title}
                </SANTypography>
                <SANTypography fontSize='xs' color='grey.5' mt='xxs' mb='md'>
                    {options.subtitle}
                </SANTypography>
                <SANTypography fontSize='md' color='grey.6'>
                    {options.description}
                </SANTypography>
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
                    onClick={onClick}
                    size='xsmall'
                    variant='text'
                    color='primary'
                    uppercase
                    bold
                >
                    {options.completed && (
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
