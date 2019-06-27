import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../Atoms/Typography'

class ESErrorBoundary extends Component {
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

ESErrorBoundary.propTypes = {
    className: PropTypes.string
}
ESErrorBoundary.defaultProps = {}

export default ESErrorBoundary
