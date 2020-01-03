import React, { Component } from 'react'

import { SANError500, ISANError500Props } from '../Error500'

export interface ISANErrorBoundaryProps extends ISANError500Props {
    component?: React.ReactNode
}

class SANErrorBoundary extends Component<
    ISANErrorBoundaryProps,
    { hasError: boolean; message: string }
> {
    constructor(props) {
        super(props)
        this.state = { hasError: false, message: '' }
    }

    componentDidCatch(error) {
        console.log('ErrorBoundary:', error)
        this.setState({
            hasError: true,
            message: !!error.message ? error.message : error
        })
    }

    render() {
        const { hasError } = this.state
        const { children, component, ...props } = this.props

        return hasError ? (
            component ? (
                component
            ) : (
                <SANError500 {...props} />
            )
        ) : (
            children
        )
    }
}

export default SANErrorBoundary
