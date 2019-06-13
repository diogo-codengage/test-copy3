import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESStopwatch from 'sanar-ui/dist/Components/Atoms/Stopwatch'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

import { useQuestionsContext } from '../Context'

const intlPath = 'questionBase.question.'

const SANQuestionHeader = ({ history }) => {
    const { stopwatchRef, totalQuestions, currentIndex } = useQuestionsContext()
    const { t } = useTranslation('esanar')

    return (
        <div className='questions-question__header'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    title={
                        <div className='d-flex align-items-center'>
                            <ESTypography level={4} className='mr-xs'>
                                {`${t(`${intlPath}title`)} ${currentIndex}`}
                            </ESTypography>
                            <ESTypography
                                variant='body1'
                                className='text-grey-6'
                            >
                                {totalQuestions > 999
                                    ? `/ 999+`
                                    : `/ ${totalQuestions}`}
                            </ESTypography>
                        </div>
                    }
                    extra={
                        <div className='d-flex align-items-center'>
                            <ESStopwatch className='mr-sm' ref={stopwatchRef} />
                            <ESButton
                                size='small'
                                variant='outlined'
                                uppercase
                                bold
                                onClick={() =>
                                    history.push('/aluno/banco-questoes/filtro')
                                }
                            >
                                {t(`${intlPath}endPracticeButton`)}
                            </ESButton>
                        </div>
                    }
                />
            </SANPortalPagesContainer>
        </div>
    )
}

SANQuestionHeader.propTypes = {
    total: PropTypes.number,
    current: PropTypes.number
}

SANQuestionHeader.defaultProps = {
    current: 1,
    total: 1
}

export default withRouter(SANQuestionHeader)
