import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'react-i18next'

import ESButton from '../../Atoms/Button'
import ESEvaIcon from '../../Atoms/EvaIcon'

const ESQuestionFooter = ({
    handleJump,
    handleNext,
    handleConfirm,
    handlePrevious,
    selected,
    answer,
    question,
    onlyStep,
    isHistoric,
    propsNext,
    propsPrev,
    isBookmarked
}) => {
    const { t } = useTranslation('sanarui')

    const BookmarkedFooter = () => (
        <>
            <div className='es-question__footer'>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <ESButton
                        size='small'
                        variant='text'
                        color='primary'
                        uppercase
                        bold
                        onClick={handlePrevious}
                        {...propsPrev}
                    >
                        <ESEvaIcon key='back' name='arrow-back-outline' />
                        {t('question.previous')}
                    </ESButton>
                    <ESButton
                        size='small'
                        color='primary'
                        variant='text'
                        uppercase
                        bold
                        onClick={handleNext}
                        {...propsNext}
                    >
                        {t('question.next')}
                        <ESEvaIcon name='arrow-forward-outline' />
                    </ESButton>
                </div>
                <ESButton
                    size='small'
                    color='primary'
                    variant={onlyStep || answer ? 'solid' : 'outlined'}
                    uppercase
                    bold
                    disabled={!selected || !question}
                    onClick={answer ? handleNext : handleConfirm}
                >
                    {t('question.confirm')}
                </ESButton>
            </div>
        </>
    )

    return (
        <>
            {isBookmarked ? (
                <BookmarkedFooter />
            ) : (
                <div className='es-question__footer'>
                    {isHistoric ? (
                        <>
                            <ESButton
                                size='small'
                                variant='text'
                                color='primary'
                                uppercase
                                bold
                                onClick={handlePrevious}
                                {...propsPrev}
                            >
                                <ESEvaIcon
                                    key='back'
                                    name='arrow-back-outline'
                                />
                                {t('question.previous')}
                            </ESButton>
                            <ESButton
                                size='small'
                                color='primary'
                                variant='text'
                                uppercase
                                bold
                                onClick={handleNext}
                                {...propsNext}
                            >
                                {t('question.next')}
                                <ESEvaIcon name='arrow-forward-outline' />
                            </ESButton>
                        </>
                    ) : (
                        <>
                            <ESButton
                                size='small'
                                variant='text'
                                uppercase
                                bold
                                onClick={handleJump}
                                disabled={answer || !question}
                            >
                                <ESEvaIcon key='jump' name='refresh-outline' />
                                {t('question.jump')}
                            </ESButton>
                            <ESButton
                                size='small'
                                color='primary'
                                variant={
                                    onlyStep || answer ? 'solid' : 'outlined'
                                }
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
                        </>
                    )}
                </div>
            )}
        </>
    )
}

ESQuestionFooter.propTypes = {
    answer: PropTypes.string,
    handleSelect: PropTypes.func,
    handleConfirm: PropTypes.func,
    handleNext: PropTypes.func,
    handleJump: PropTypes.func,
    onlyStep: PropTypes.bool,
    isHistoric: PropTypes.bool,
    isBookmarked: PropTypes.bool
}

export default ESQuestionFooter
