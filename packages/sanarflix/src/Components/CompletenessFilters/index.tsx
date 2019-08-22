import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANRadioButton, SANRadioGroup } from '@sanar/components'

export type ICompletenessFiltersValues = 'all' | 'completed' | 'incompleted'

interface IProps {
    defaultValue?: ICompletenessFiltersValues
    value: ICompletenessFiltersValues
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => any
}

export const FLXCompletenessFilters = (props: IProps) => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANRadioGroup blocks {...props}>
            <SANRadioButton value='all' data-testid='flx-filter-all'>
                {t('global.completenessFilters.all')}
            </SANRadioButton>
            <SANRadioButton
                value='completed'
                data-testid='flx-filter-completed'
            >
                {t('global.completenessFilters.completed')}
            </SANRadioButton>
            <SANRadioButton
                value='incompleted'
                data-testid='flx-filter-incomplete'
            >
                {t('global.completenessFilters.incomplete')}
            </SANRadioButton>
        </SANRadioGroup>
    )
}
