import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import { SANSpin } from '../../Atoms/Spin'

export interface ISANQueryProps {
    children: (data: any) => React.ReactElement
    query: DocumentNode
    options?: Object
    loaderComp?: React.ReactElement
    errorComp?: React.ReactElement
    loaderProps?: Object
    errorProps?: Object
}

const SANQuery = ({
    children,
    query,
    options,
    loaderComp,
    errorComp,
    loaderProps
}: ISANQueryProps) => {
    const { data, loading, error, ...props } = useQuery(query, options)

    if (loading) return loaderComp ? loaderComp : <SANSpin {...loaderProps} />
    if (error) return errorComp ? errorComp : <p>error</p>
    if (!data) return null

    return children({ data, loading, error, ...props })
}

export default SANQuery
