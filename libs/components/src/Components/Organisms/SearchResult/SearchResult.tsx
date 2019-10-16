import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { SANBox } from '../../Atoms/Box'

export interface ISANSearchResultProps<T> {
    dataSource: T[]
    renderItem: (item: T, index: number) => React.ReactNode
}

const SANSearchResultList = <T extends {}>(props: ISANSearchResultProps<T>) => {
    const { dataSource, renderItem } = props
    const { t } = useTranslation('components')

    return (
        <SANBox>
            {dataSource.map(renderItem)}
        </SANBox>
    )
}

export default SANSearchResultList
