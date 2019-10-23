import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import { SANSpin } from '../../Atoms/Spin'
import { SANGenericError, ISANGenericErrorProps } from '../GenericError'

export interface ISANQueryProps {
    children: (data: any) => React.ReactElement
    query: DocumentNode
    options?: Object
    loaderComp?: React.ReactElement
    errorComp?: React.ReactElement
    loaderProps?: Object
    errorProps?: ISANGenericErrorProps
}

const SANQuery = ({
    children,
    query,
    options,
    loaderComp,
    errorComp,
    loaderProps,
    errorProps
}: ISANQueryProps) => {
    const { data, loading, error, ...props } = useQuery(query, options)

    if (loading && props.networkStatus !== 3)
        return loaderComp ? loaderComp : <SANSpin {...loaderProps} />
    if (error)
        return errorComp ? (
            errorComp
        ) : (
            <SANGenericError mb='xl' {...errorProps} />
        )
    if (!data) return null

    return children({ data, loading, error, ...props })
}

export default SANQuery
