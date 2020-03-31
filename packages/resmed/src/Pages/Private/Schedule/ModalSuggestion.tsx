import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANModalFooter
} from '@sanar/components'

interface IModalProps {
    onCancel: () => void
    visible: boolean
}

interface IRMModalSuggestion extends IModalProps {
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
                    variant='text'
                    color='primary'
                    uppercase
                    bold
                    onClick={props.onCancel}
                >
                    {t('schedule.modal.suggestion.back')}
                </SANButton>
                <SANButton
                    size='small'
                    mr='md'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={onConfirm}
                >
                    {t('schedule.modal.suggestion.confirm')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}
