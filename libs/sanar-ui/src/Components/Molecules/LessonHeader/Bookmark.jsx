import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

const ESBookmark = ({ bookmarked, bookmarkLabel, onBookmarked, hideLabel }) => {
    const { t } = useTranslation('sanarui')

    return (
        <ESButton
            size='small'
            variant='text'
            color='white'
            onClick={onBookmarked}
            className='bookmark'
        >
            {bookmarked ? (
                <ESEvaIcon name='heart' key='bookmarked' color='secondary' />
            ) : (
                <ESEvaIcon name='heart-outline' key='not-bookmarked' />
            )}
            {!hideLabel && bookmarkLabel
                ? bookmarkLabel
                : !hideLabel && t('classroom.header.extra.bookmark')}
        </ESButton>
    )
}

ESBookmark.propTypes = {
    bookmarked: PropTypes.bool,
    bookmarkLabel: PropTypes.string,
    onBookmarked: PropTypes.func
}

ESBookmark.defaultProps = {}

export default ESBookmark
