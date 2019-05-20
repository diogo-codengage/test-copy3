import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../../Atoms/Typography'
import ESEvaIcon from '../../../Atoms/EvaIcon'
import ESButton from '../../../Atoms/Button'
import ESInput from '../../../Atoms/Input'

const ESSearch = ({ className, placeholder }) => {
    const classes = classNames('es-search', className)

    return (
        <div className={classes}>
            <ESInput placeholder={placeholder} />
            <div className='d-flex align-items-center justify-content-flex-end mt-md'>
                <ESButton circle size='small' variant='text' color='primary'>
                    <ESEvaIcon name='mic-outline' />
                </ESButton>
                <ESButton
                    size='small'
                    variant='solid'
                    bold
                    uppercase
                    color='primary'
                    className='ml-md'
                    disabled
                >
                    BUSCAR
                </ESButton>
            </div>
        </div>
    )
}

ESSearch.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string
}

ESSearch.defaultProps = {
    placeholder: 'Busque no seu curso'
}

export default ESSearch
