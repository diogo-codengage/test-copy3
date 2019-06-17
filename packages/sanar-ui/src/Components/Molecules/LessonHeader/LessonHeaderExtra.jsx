import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESTypography from '../../Atoms/Typography'

const ESLessonHeaderExtra = ({
    className,
    previousLesson,
    nextLesson,
    onPrevious,
    onNext,
    onBookmarked,
    ...props
}) => {
    const classes = classNames('es-lesson-header__extra', className)

    const { t } = useTranslation('sanarui')

    return (
        <ESRow className={classes} type='flex' gutter={16}>
            <ESCol xs={0} xl={8} flex={1}>
                <ESButton
                    className='es-lesson-header__extra--bookmark'
                    size='small'
                    variant='text'
                    color='white'
                >
                    <ESEvaIcon name='heart-outline' />
                    {t('classroom.header.extra.bookmark')}
                </ESButton>
            </ESCol>
            <ESCol xs={24} sm={12} flex={1}>
                <ESButton size='small' variant='outlined' color='white'>
                    <ESEvaIcon name='arrow-back-outline' />
                    <ESTypography ellipsis>{previousLesson}</ESTypography>
                </ESButton>
            </ESCol>
            <ESCol xs={24} sm={12} flex={1}>
                <ESButton size='small' variant='outlined' color='white'>
                    <ESTypography ellipsis>{nextLesson}</ESTypography>
                    <ESEvaIcon name='arrow-forward-outline' />
                </ESButton>
            </ESCol>
        </ESRow>
    )
}

ESLessonHeaderExtra.propTypes = {
    className: PropTypes.string,
    previousLesson: PropTypes.string,
    nextLesson: PropTypes.string,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    onBookmarked: PropTypes.func
}

ESLessonHeaderExtra.defaultProps = {
    previousLesson: 'Previous',
    nextLesson: 'Next'
}

export default ESLessonHeaderExtra
