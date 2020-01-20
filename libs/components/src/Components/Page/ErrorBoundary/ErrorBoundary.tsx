import React, { Component } from 'react'

import { SANError500, ISANError500Props } from '../Error500'

export interface ISANErrorBoundaryProps extends Partial<ISANError500Props> {
    component?: React.ReactNode
    onError?: (error?: any, errorInfo?: any) => void
}

class SANErrorBoundary extends Component<
    ISANErrorBoundaryProps,
    { hasError: boolean; message: string }
> {
    constructor(props) {
        super(props)
        this.state = { hasError: false, message: '' }
    }

    componentDidCatch(error, errorInfo) {
        console.log('ErrorBoundary:', error)
        this.setState({
            hasError: true,
            message: !!error.message ? error.message : error
        })

        !!this.props.onError && this.props.onError(error, errorInfo)
    }

    render() {
        const { hasError } = this.state
        const { children, component, ...props } = this.props

        return hasError ? (
            component ? (
                component
            ) : (
                <SANError500
                    onClick={() =>
                        console.log('[SANError500]: prop `onClick` not defined')
                    }
                    {...props}
                />
            )
        ) : (
            children
        )
    }
}

export default SANErrorBoundary
