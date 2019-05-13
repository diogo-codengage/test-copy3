import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'

import { useMainMenuContext } from './context'

const ESMainMenuContentHeader = ({ className, title }) => {
    const { position, setToggle } = useMainMenuContext()
    const classes = classNames('es-main-menu__content--header', className)

    return (
        <div className={classes}>
            <ESTypography level={5}>{title}</ESTypography>
            {position === 'bottom' && (
                <ESButton
                    onClick={() => setToggle(false)}
                    size='medium'
                    variant='text'
                    circle
                >
                    <ESEvaIcon name='close-outline' />
                </ESButton>
            )}
        </div>
    )
}

ESMainMenuContentHeader.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string
}

ESMainMenuContentHeader.defaultProps = {}

export default ESMainMenuContentHeader