import React, { useState } from 'react'

import { SANBox } from '../../Atoms/Box'

export interface ISANSearchResultProps<T> {
    dataSource: T[]
    renderItem: (item: T, index: number, arr: T[]) => React.ReactNode
}

const SANSearchResultList = <T extends {}>(props: ISANSearchResultProps<T>) => {
    const { dataSource, renderItem } = props

    return <SANBox>{dataSource.map(renderItem)}</SANBox>
}

export default SANSearchResultList
