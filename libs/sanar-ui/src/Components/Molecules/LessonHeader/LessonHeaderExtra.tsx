import React from 'react'
import PropTypes from 'prop-types'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import { ESRow, ESCol } from '../../Atoms/Grid'

import ESBookmark from './Bookmark'

const ESLessonHeaderExtra: React.FC<any> = ({
    bookmarked,
    bookmarkLabel,
    onBookmarked,
    className,
    previousLesson,
    nextLesson,
    onPrev,
    onNext
}) => (
    <ESRow className={className} type='flex' gutter={12}>
        {onBookmarked && (
            <ESCol className='bookmark'>
                <ESBookmark {...{ bookmarked, bookmarkLabel, onBookmarked }} />
            </ESCol>
        )}
        <ESCol xs={12} sm={onBookmarked ? 6 : 7}>
            <ESButton
                size='small'
                variant='outlined'
                onClick={onPrev}
                color='white'
                block
                disabled={!previousLesson}
            >
                <ESEvaIcon name='arrow-back-outline' />
                {previousLesson}
            </ESButton>
        </ESCol>
        <ESCol xs={12} sm={onBookmarked ? 6 : 7}>
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

ESLessonHeaderExtra.propTypes = {
    bookmarked: PropTypes.bool,
    bookmarkLabel: PropTypes.string,
    onBookmarked: PropTypes.func,
    previousLesson: PropTypes.string,
    nextLesson: PropTypes.string,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func
}

ESLessonHeaderExtra.defaultProps = {}

export default ESLessonHeaderExtra
