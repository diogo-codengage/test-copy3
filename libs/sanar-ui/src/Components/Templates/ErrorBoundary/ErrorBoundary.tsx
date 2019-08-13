import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../Atoms/Typography'

class ESErrorBoundary extends Component<any,any> {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            message: !!error.message ? error.message : error
        }
    }

    render() {
        const { className, children } = this.props
        const { hasError, message } = this.state

        const classes = classNames('es-error-boundary', className)
        return hasError ? (
            <div className={classes}>
                <ESTypography level={5}>Something went wrong.</ESTypography>
                <ESTypography variant='body2'>{message}</ESTypography>
            </div>
        ) : (
            children
        )
    }
}

// @ts-ignore
ESErrorBoundary.propTypes = {
    className: PropTypes.string
}
// @ts-ignore
ESErrorBoundary.defaultProps = {}

export default ESErrorBoundary
