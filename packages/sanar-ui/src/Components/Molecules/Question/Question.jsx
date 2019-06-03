import React from 'react'
import PropTypes from 'prop-types'
import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'
import { ESAlternative } from '../../Atoms/Question/Alternative'
import './style.less'
import ESEvaIcon from '../../Atoms/EvaIcon'

const ESQuestion = ({ title, content, alternatives, next, jump }) => (
    <div>
        <div className='es-question'>
            <ESTypography level={6} className='es-question__title'>
                {title}
            </ESTypography>
            <ESTypography variant='subtitle2' className='es-question__subtitle'>
                {content}
            </ESTypography>
            {alternatives &&
                alternatives.length &&
                alternatives.map(alternative => (
                    <ESAlternative {...alternative} />
                ))}
        </div>
        <div className='footer'>
            <ESButton
                icon={<ESEvaIcon name='refresh-outline' color='default' />}
                size='xsmall'
                color='secondary'
                variant='text'
                uppercase
                bold
                onClick={jump}
            >
                Pular
            </ESButton>
            <ESButton
                size='xsmall'
                color='primary'
                variant='solid'
                uppercase
                bold
                onClick={next}
            >
                Próxima
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
