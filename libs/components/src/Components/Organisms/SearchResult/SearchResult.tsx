import React from 'react'

import { SANBox } from '../../Atoms/Box'
import { IItem } from './SearchResultItem'

export interface ISANSearchResultProps {
    dataSource: IItem[]
    renderItem: (item: IItem, index: number, arr: IItem[]) => React.ReactNode
}

const SANSearchResultList = (props: ISANSearchResultProps) => {
    const { dataSource, renderItem } = props

    return (
        <SANBox
            border='1px solid'
            borderColor='grey.2'
            boxShadow={1}
            bg='white.10'
            borderRadius='base'
        >
            {dataSource.map(renderItem)}
        </SANBox>
    )
}

export default SANSearchResultList
