import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter
} from '@sanar/components'

export const RMModalSuggestion = ({ onConfirm, checked, ...props }) => {
    const { t } = useTranslation('resmed')

    return (
        <SANModal
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

export const RMModalSchedule = ({
    type,
    title,
    subtitle,
    description,
    ...props
}) => {
    const { t } = useTranslation('resmed')

    return (
        <SANModal title={t('logout.signOut')} centered {...props}>
            <SANTypography fontSize='lg' color='grey.7'>
                {title}
            </SANTypography>
            <SANTypography fontSize='xs' color='grey.5'>
                {subtitle}
            </SANTypography>
            <SANTypography fontSize='md' color='grey.6'>
                {description}
            </SANTypography>
            <SANModalFooter>
                <SANButton size='small' mr='md' variant='text' uppercase>
                    {t('global.leave')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}
