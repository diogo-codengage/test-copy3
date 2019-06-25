import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import ESTypography from '../../Atoms/Typography'
import ESRate from '../../Atoms/Rate'
import ESButton from '../../Atoms/Button'
import ESEvaIcon from '../../Atoms/EvaIcon'

const ESLessonHeaderLeft = ({ title, subtitle, rate, onClick }) => {
    const { t } = useTranslation('sanarui')

    return (
        <>
            <ESTypography ellipsis level={5}>
                {title}
            </ESTypography>
            <div className='subtitle'>
                <ESTypography
                    variant='subtitle2'
                    className='subtitle__path'
                    ellipsis
                >
                    {subtitle}
                </ESTypography>
                {rate && (
                    <>
                        <ESTypography
                            variant='subtitle2'
                            className='subtitle__rate'
                        >
                            {t('lessonHeader.rateClass')}:
                        </ESTypography>
                        <ESRate {...rate} />
                    </>
                )}
            </div>
            <ESButton
                onClick={onClick}
                circle
                size='small'
                variant='text'
                className='open-menu'
            >
                <ESEvaIcon name='menu-outline' />
            </ESButton>
        </>
    )
}

ESLessonHeaderLeft.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    rate: PropTypes.shape({
        value: PropTypes.any,
        onChange: PropTypes
    }),
    onClick: PropTypes.func.isRequired
}

ESLessonHeaderLeft.defaultProps = {}

export default ESLessonHeaderLeft
