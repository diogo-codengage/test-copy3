import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Switch, Route, Redirect } from 'react-router-dom'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import SANQuestionsFilter from './Filter'
import SANQuestionPage from './Question'
import SANQuestionHeader from './Header'
import { useQuestionsContext } from '../Context'

const SANQuestionDetailsPage = ({ match: { url }, history }) => {
    const { t } = useTranslation('esanar')
    const { skippedQuestions, totalAnsweredQuestions } = useQuestionsContext()

    useEffect(() => {
        const unblock = history.block(({ pathname }) => {
            const route =
                pathname.includes('banco-questoes/perguntas') ||
                pathname.includes('banco-questoes/finalizado')
            if (
                !route &&
                totalAnsweredQuestions > 0 &&
                totalAnsweredQuestions > skippedQuestions
            ) {
                Modal.confirm({
                    centered: true,
                    title: t('questionBase.question.goOut.title'),
                    content: t('questionBase.question.goOut.subtitle'),
                    okText: t('global.yes'),
                    cancelText: t('global.no'),
                    keyboard: false,
                    onOk: () => {
                        Modal.destroyAll()
                        history.push('/aluno/banco-questoes/finalizado')
                    },
                    onCancel: () => {
                        Modal.destroyAll()
                    }
                })
                return false
            } else {
                return true
            }
        })
        return () => unblock()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalAnsweredQuestions, skippedQuestions])

    return (
        <>
            <SANQuestionHeader />
            <div className='questions-question'>
                <Switch>
                    <Route
                        path={`${url}/pratica`}
                        component={SANQuestionPage}
                    />
                    <Route
                        path={`${url}/filtro`}
                        component={SANQuestionsFilter}
                    />
                    <Route
                        path={[`${url}/`, `${url}`]}
                        render={() => <Redirect to={`${url}/pratica`} />}
                    />
                </Switch>
            </div>
        </>
    )
}

SANQuestionDetailsPage.propTypes = {
    question: PropTypes.any
}

export default SANQuestionDetailsPage
