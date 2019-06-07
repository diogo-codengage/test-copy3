import React from 'react'
import PropTypes from 'prop-types'
import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'
import { ESAlternative } from '../../Atoms/Alternative'
import ESEvaIcon from '../../Atoms/EvaIcon'
import { ESComment } from '../Comment'

const ESQuestion = ({
    alternatives,
    answer,
    answered,
    comment,
    content,
    id,
    nextText,
    selectedAlternative,
    title,
    onConfirm,
    onJump,
    onNext,
    onSelectAlternative
}) => (
    <div key={id}>
        <div className='es-question'>
            <ESTypography level={6} className='es-question__title'>
                {title}
            </ESTypography>
            <ESTypography variant='subtitle2' className='es-question__subtitle'>
                {content}
            </ESTypography>
            {alternatives &&
                alternatives.length &&
                alternatives.map((alternative, index) => {
                    return (
                        <ESAlternative
                            {...alternative}
                            index={index}
                            percent={alternative.percent}
                            selected={selectedAlternative}
                            correctAnswer={answer}
                            onSelectAlternative={onSelectAlternative}
                        />
                    )
                })}
            {comment && (
                <div className='comment-container'>
                    <div className='comment-container__header'>
                        <ESTypography variant='body1' strong>
                            Comentário do especialista
                        </ESTypography>
                        <ESButton variant='outlined' size='small' bold>
                            Enviar feedback
                        </ESButton>
                    </div>
                    <div className='comment-container__body'>
                        <ESComment
                            author={comment.author}
                            content={comment.content}
                            time={comment.time}
                        />
                    </div>
                </div>
            )}
        </div>
        <div className='footer'>
            <ESButton
                size='xsmall'
                color='secondary'
                variant='text'
                uppercase
                bold
                onClick={onJump}
            >
                <ESEvaIcon name='refresh-outline' color='default' />
                Pular
            </ESButton>
            <ESButton
                size='xsmall'
                color='primary'
                variant='solid'
                uppercase
                bold
                onClick={answered ? onNext : onConfirm}
            >
                {nextText}
                <ESEvaIcon name='arrow-forward-outline' color='#FFF' />
            </ESButton>
        </div>
    </div>
)

ESQuestion.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    alternatives: PropTypes.array
}

export default ESQuestion
