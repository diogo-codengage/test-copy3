import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESTypography from '../../Atoms/Typography'
import ESCounterLabel from '../../Atoms/CounterLabel'
import AvatarListItem from '../AvatarListItem'

const ESQuestionListItem = ({
    className,
    loading,
    avatar,
    title,
    author,
    userIsAuthor,
    badgeInfo,
    interactionTime,
    responses
}) => {
    const classes = classNames('es-question-list-item', className)
    return (
        <AvatarListItem avatar={avatar} loading={loading}>
            <ESRow>
                <ESCol className='mb-xs'>
                    <ESTypography
                        ellipsis
                        strong
                        className='es-question-list-item__content--title'
                    >
                        {title}
                    </ESTypography>
                </ESCol>
            </ESRow>
            <ESRow>
                <ESCol className='es-question-list-item__content__subtitle'>
                    <ESRow type='flex' justify='space-between' align='middle'>
                        <ESCol>
                            <ESRow type='flex' align='middle' gutter={8}>
                                <ESCol>
                                    <ESTypography
                                        variant='caption'
                                        strong
                                        className='es-question-list-item__content__subtitle--author'
                                    >
                                        {author}
                                    </ESTypography>
                                </ESCol>
                                {userIsAuthor && (
                                    <ESCol>
                                        <div className='es-question-list-item__content__subtitle--badge'>
                                            <ESTypography
                                                variant='overline'
                                                strong
                                            >
                                                {badgeInfo}
                                            </ESTypography>
                                        </div>
                                    </ESCol>
                                )}
                                <ESCol>
                                    <ESTypography
                                        variant='caption'
                                        className='es-question-list-item__content__subtitle--interaction'
                                    >
                                        {interactionTime}
                                    </ESTypography>
                                </ESCol>
                            </ESRow>
                        </ESCol>
                        <ESCol
                            xs={0}
                            sm={4}
                            lg={6}
                            className='es-question-list-item__content__subtitle--responses'
                        >
                            <ESCounterLabel
                                counter={responses}
                                label='Resposta'
                            />
                        </ESCol>
                    </ESRow>
                </ESCol>
            </ESRow>
        </AvatarListItem>
    )
}

ESQuestionListItem.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    avatar: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    userIsAuthor: PropTypes.bool,
    badgeInfo: PropTypes.string,
    interactionTime: PropTypes.string.isRequired,
    responses: PropTypes.number
}
ESQuestionListItem.defaultProps = {}

export default ESQuestionListItem
