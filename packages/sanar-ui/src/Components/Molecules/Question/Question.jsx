import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Skeleton } from 'antd'

import ESTypography from '../../Atoms/Typography'
import ESAlternative from '../../Atoms/Alternative'
import ESSpin from '../../Atoms/Spin'
import ESImageViewer from '../ImageViewer'
import ESCard from '../Card'

import ESQuestionFooter from './Footer'
import ESQuestionComment from './Comment'

const ESQuestion = ({
    answer,
    question,
    comment,
    onSelect,
    onConfirm,
    onNext,
    onPrevious,
    onJump,
    onlyStep,
    loading,
    full,
    stats,
    isHistoric
}) => {
    const [striped, setStripe] = useState({})
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
        setStripe({})
        onConfirm && onConfirm(selected)
    }

    const handleNext = () => {
        reset()
        onNext && onNext(answer && answer === selected)
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

    const getPercent = id => {
        if (!stats || !stats.length) return
        const statistic = stats.find(statistic => statistic.id === id)
        return statistic && parseInt(statistic.percent)
    }

    useEffect(() => {
        setStripe({})
    }, [question])

    return (
        <ESCard
            className={classNames('es-question', { 'es-question__full': full })}
        >
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
                                    {`${question.institution.name}, ${
                                        question.year
                                    }`}
                                </ESTypography>
                                <ESTypography
                                    variant='subtitle2'
                                    className='mb-lg'
                                >
                                    {question.statement}
                                </ESTypography>
                                {question.images && question.images.data[0] && (
                                    <ESImageViewer
                                        images={
                                            question.images.data[0].sizedImages
                                        }
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
                                        percent={getPercent(alternative.id)}
                                        onSelect={handleSelect}
                                        status={verifyStatus(
                                            alternative.id,
                                            answer
                                        )}
                                    />
                                )
                            )}
                        </>
                    )}
                </div>

                {question && comment && answer && (
                    <ESQuestionComment {...comment} />
                )}
                <ESQuestionFooter
                    {...{
                        handleJump,
                        handleNext,
                        handleConfirm,
                        handlePrevious: onPrevious,
                        selected,
                        answer,
                        question,
                        onlyStep,
                        isHistoric
                    }}
                />
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
    onPrevious: PropTypes.func,
    onJump: PropTypes.func,
    onlyStep: PropTypes.bool,
    full: PropTypes.bool,
    isHistoric: PropTypes.bool,
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            percent: PropTypes.number
        })
    ),
    comment: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
            profile_picture: PropTypes.string
        }),
        text: PropTypes.string,
        time: PropTypes.string
    }),
    question: PropTypes.shape({
        id: PropTypes.string,
        images: PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string,
                    sizedImages: PropTypes.shape({
                        small: PropTypes.shape({
                            width: PropTypes.number,
                            height: PropTypes.number,
                            url: PropTypes.string
                        }),
                        medium: PropTypes.shape({
                            width: PropTypes.number,
                            height: PropTypes.number,
                            url: PropTypes.string
                        }),
                        large: PropTypes.shape({
                            width: PropTypes.number,
                            height: PropTypes.number,
                            url: PropTypes.string
                        })
                    })
                })
            )
        }),
        statement: PropTypes.string,
        year: PropTypes.number,
        institution: PropTypes.shape({
            name: PropTypes.string
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
