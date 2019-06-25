import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import { ESRow, ESCol } from '../../Atoms/Grid'

const ESLessonHeaderExtra = ({
    bookmarked,
    bookmarkLabel,
    className,
    previousLesson,
    nextLesson,
    onPrevious,
    onNext,
    onBookmarked
}) => {
    const classes = classNames('es-lesson-header__extra', className)

    const { t } = useTranslation('sanarui')

    return (
        <ESRow className={className} type='flex' gutter={12}>
            <ESCol>
                <ESButton
                    size='small'
                    variant='text'
                    color='white'
                    onClick={onBookmarked}
                    block
                    className='bookmark'
                >
                    {bookmarked ? (
                        <ESEvaIcon name='heart' key='bookmarked' />
                    ) : (
                        <ESEvaIcon name='heart-outline' key='not-bookmarked' />
                    )}
                    {bookmarkLabel || t('classroom.header.extra.bookmark')}
                </ESButton>
            </ESCol>
            <ESCol xs={12} sm={6}>
                <ESButton
                    size='small'
                    variant='outlined'
                    onClick={onPrevious}
                    color='white'
                    block
                    disabled={!previousLesson}
                >
                    <ESEvaIcon name='arrow-back-outline' />
                    {previousLesson}
                </ESButton>
            </ESCol>
            <ESCol xs={12} sm={6}>
                <ESButton
                    size='small'
                    variant='outlined'
                    onClick={onNext}
                    color='white'
                    block
                    disabled={!nextLesson}
                >
                    {nextLesson}
                    <ESEvaIcon name='arrow-forward-outline' />
                </ESButton>
            </ESCol>
        </ESRow>
    )
}

ESLessonHeaderExtra.propTypes = {
    bookmarked: PropTypes.book,
    bookmarkLabel: PropTypes.string,
    className: PropTypes.string,
    previousLesson: PropTypes.string,
    nextLesson: PropTypes.string,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    onBookmarked: PropTypes.func
}

ESLessonHeaderExtra.defaultProps = {}

export default ESLessonHeaderExtra
