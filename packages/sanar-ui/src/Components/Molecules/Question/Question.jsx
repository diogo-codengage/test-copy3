import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { Skeleton } from 'antd'

import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'
import ESAlternative from '../../Atoms/Alternative'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESSpin from '../../Atoms/Spin'
import ESImageViewer from '../ImageViewer'
import ESCard from '../Card'
import ESComment from '../Comment'

const ExpertComment = ({ author, content, time }) => {
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

const ESQuestion = ({
    answer,
    answered,
    question,
    onSelect,
    onConfirm,
    onNext,
    onJump,
    onlyStep,
    loading
}) => {
    const { t } = useTranslation('sanarui')
    const [selected, setSelect] = useState(null)
    const [confirmed, setConfirm] = useState(false)

    const handleSelect = item => {
        if (confirmed) return
        setSelect(item)
        onSelect && onSelect(item)
    }

    const handleConfirm = () => {
        setConfirm(true)
        onConfirm && onConfirm(selected)
    }

    const handleNext = () => {
        reset()
        onNext && onNext()
    }

    const handleJump = () => {
        reset()
        onJump && onJump()
    }

    const reset = () => {
        setConfirm(false)
        setSelect(null)
    }

    const verifyStatus = (row, answer) => {
        if (answer) {
            if (answer === selected) {
                if (selected === row) {
                    return 'correct'
                } else if (selected !== row) {
                    return 'incorrect-when-miss'
                }
            } else {
                if (answer === row) {
                    return 'correct-when-miss'
                } else if (answer !== row && selected === row) {
                    return 'incorrect'
                } else {
                    return 'incorrect-when-miss'
                }
            }
        } else {
            if (selected === row) {
                return 'selected'
            }
        }

        return 'normal'
    }

    return (
        <ESCard className='es-question'>
            <ESSpin spinning={loading}>
                <div className='es-question__content'>
                    <Skeleton
                        active
                        loading={!question}
                        paragraph={{ rows: 3, width: '100%' }}
                    >
                        {question && (
                            <>
                                <ESTypography level={6} className='mb-md'>
                                    {`${question.instituition.name}, ${
                                        question.year
                                    }`}
                                </ESTypography>
                                <ESTypography
                                    variant='subtitle2'
                                    className='mb-lg'
                                >
                                    {question.statement}
                                </ESTypography>
                                {question.image && (
                                    <ESImageViewer
                                        image={question.image}
                                        className='mb-md'
                                    />
                                )}
                            </>
                        )}
                    </Skeleton>
                    {!question ? (
                        [0, 1, 2, 3].map((_, i) => (
                            <Skeleton
                                key={i}
                                active
                                loading={!question}
                                avatar={{ size: 32, shape: 'circle' }}
                                paragraph={false}
                                className='mt-lg'
                            />
                        ))
                    ) : (
                        <>
                            {question.alternatives.map((alternative, index) => (
                                <ESAlternative
                                    key={alternative.id}
                                    {...alternative}
                                    index={index}
                                    percent={alternative.percent}
                                    onSelect={handleSelect}
                                    status={verifyStatus(
                                        alternative.id,
                                        answer
                                    )}
                                />
                            ))}
                            {question.comment && (answered || onlyStep) && (
                                <ExpertComment {...question.comment} />
                            )}
                        </>
                    )}
                </div>
                <div className='es-question__footer'>
                    <ESButton
                        size='small'
                        variant='text'
                        uppercase
                        bold
                        onClick={handleJump}
                        disabled={answered}
                    >
                        <ESEvaIcon name='refresh-outline' />
                        {t('question.jump')}
                    </ESButton>
                    <ESButton
                        size='small'
                        color='primary'
                        variant='outlined'
                        uppercase
                        bold
                        disabled={!selected}
                        onClick={
                            onlyStep
                                ? handleNext
                                : answered
                                ? handleNext
                                : handleConfirm
                        }
                    >
                        {answered ? t('question.next') : t('question.confirm')}
                        <ESEvaIcon name='arrow-forward-outline' />
                    </ESButton>
                </div>
            </ESSpin>
        </ESCard>
    )
}

ESQuestion.propTypes = {
    answer: PropTypes.string,
    answered: PropTypes.bool,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onConfirm: PropTypes.func,
    onNext: PropTypes.func,
    onJump: PropTypes.func,
    onlyStep: PropTypes.bool,
    question: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.string,
        statement: PropTypes.string,
        year: PropTypes.number,
        instituition: PropTypes.shape({
            name: PropTypes.string
        }),
        comment: PropTypes.shape({
            author: PropTypes.shape({
                name: PropTypes.string,
                avatar: PropTypes.string
            }),
            content: PropTypes.string,
            time: PropTypes.string
        }),
        alternatives: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                text: PropTypes.string
            })
        )
    })
}

export default ESQuestion
