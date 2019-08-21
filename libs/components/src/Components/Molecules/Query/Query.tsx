import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import { SANSpin } from '../../Atoms/Spin'

export interface ISANQueryProps {
    children: (data: any) => React.ReactElement
    query: DocumentNode
    variables?: Object
    loaderComp?: React.ReactElement
    errorComp?: React.ReactElement
    loaderProps?: Object
    errorProps?: Object
}

const SANQuery = ({
    children,
    query,
    variables,
    loaderComp,
    errorComp,
    loaderProps
}: ISANQueryProps) => {
    const { data, loading, error } = useQuery(query, variables)

    if (loading) return loaderComp ? loaderComp : <SANSpin {...loaderProps} />
    if (error) return errorComp ? errorComp : <p>error</p>
    if (!data) return null

    return children(data)
}

export default SANQuery
