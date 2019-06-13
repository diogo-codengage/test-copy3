import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'react-i18next'

import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'
import ESComment from '../Comment'

const ESQuestionComment = ({ author, content, time }) => {
    const { t } = useTranslation('sanarui')

    return (
        <div className='es-question__content-comment'>
            <div className='es-question__content-comment__header'>
                <ESTypography variant='body1' strong>
                    {t('question.expertComment')}
                </ESTypography>
                <ESButton variant='outlined' size='xsmall' bold disabled>
                    {t('global.sendFeedback')}
                </ESButton>
            </div>
            <ESComment
                monitor
                className='es-question__content-comment__body'
                author={author}
                content={content}
                time={time}
            />
        </div>
    )
}

ESQuestionComment.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string
    }),
    content: PropTypes.string,
    time: PropTypes.string
}

export default ESQuestionComment
