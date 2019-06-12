import React, { useState, useEffect } from 'react'
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
    question,
    onSelect,
    onConfirm,
    onNext,
    onJump,
    onlyStep,
    loading
}) => {
    const { t } = useTranslation('sanarui')
    const [striped, setStripe] = useState()
    const [selected, setSelect] = useState(null)
    const [confirmed, setConfirm] = useState(false)

    const handleSelect = item => {
        if (confirmed) return
        setSelect(item)
        onSelect && onSelect(item)
        onlyStep && handleConfirm()
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
        onJump && onJump(question)
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

    useEffect(() => {
        const values = question
            ? Array.from(
                  new Array(question.alternatives.data.length),
                  (_, i) => false
              )
            : []
        setStripe({ ...values })
    }, [question])

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
                            {question.alternatives.data.map(
                                (alternative, index) => (
                                    <ESAlternative
                                        key={alternative.id}
                                        {...alternative}
                                        index={index}
                                        striped={striped[index]}
                                        handleStripe={() =>
                                            setStripe({
                                                ...striped,
                                                [index]: !striped[index]
                                            })
                                        }
                                        percent={alternative.percent}
                                        onSelect={handleSelect}
                                        status={verifyStatus(
                                            alternative.id,
                                            answer
                                        )}
                                    />
                                )
                            )}
                            {question.comment && answer && (
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
                        disabled={answer || !question}
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
                        disabled={!selected || !question}
                        onClick={answer ? handleNext : handleConfirm}
                    >
                        {onlyStep || answer
                            ? t('question.next')
                            : t('question.confirm')}
                        <ESEvaIcon name='arrow-forward-outline' />
                    </ESButton>
                </div>
            </ESSpin>
        </ESCard>
    )
}

ESQuestion.propTypes = {
    answer: PropTypes.string,
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
        alternatives: PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    text: PropTypes.string
                })
            )
        })
    })
}

export default ESQuestion
