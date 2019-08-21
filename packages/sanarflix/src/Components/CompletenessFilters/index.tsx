import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANRadioButton, SANRadioGroup } from '@sanar/components'

interface IProps {
    defaultValue?: number
    onChange?: (e: Event) => any
}

export const FLXCompletenessFilters = (props: IProps) => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANRadioGroup blocks {...props}>
            <SANRadioButton value={1} data-testid='flx-filter-all'>
                {t('global.completenessFilters.all')}
            </SANRadioButton>
            <SANRadioButton value={2} data-testid='flx-filter-completed'>
                {t('global.completenessFilters.completed')}
            </SANRadioButton>
            <SANRadioButton value={3} data-testid='flx-filter-incomplete'>
                {t('global.completenessFilters.incomplete')}
            </SANRadioButton>
        </SANRadioGroup>
    )
}
