import React from 'react'

import { useTranslation } from 'react-i18next'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import {
    SANPage,
    SANButton,
    SANStopwatch,
    SANBox,
    SANTypography
} from '@sanar/components'

import { useQuestionsContext } from '../Context'

const FLXPractice = React.lazy(() => import('./Practice'))
const FLXFilter = React.lazy(() => import('./Filter'))

const SANStopwatchStyled = styled(SANStopwatch)`
    && {
        background-color: ${theme('colors.primary-10')};
    }
`

const FLXQuestion = ({ match: { url }, history }) => {
    const { t } = useTranslation('sanarflix')
    const {
        stopwatchRef,
        stats,
        setStats,
        currentIndex
    } = useQuestionsContext()

    const validatePractice = () => {
        !!stopwatchRef.current &&
            setStats(old => ({ ...old, time: stopwatchRef.current.time() }))
        // if (
        //     totalAnsweredQuestions === 0 ||
        //     totalAnsweredQuestions === skippedQuestions
        // ) {
        //     const modal = Modal.confirm({
        //         centered: true,
        //         title: 'Ops! Nenhuma questão foi respondida.',
        //         content:
        //             'Que tal aprimorar seus conhecimentos reiniciando a prática?',
        //         okText: 'Reiniciar prática',
        //         cancelText: 'Encerrar',
        //         onOk: () => {
        //             reset()
        //             modal.destroy()
        //         },
        //         onCancel: () => {
        //             reset()
        //             history.push('../filtro')
        //         }
        //     })
        //     return
        // }

        history.push('/portal/banco-questoes/finalizado')
    }

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: '8'
            }}
            HeaderProps={{
                extra: (
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent={{ sm: 'flex-end', _: 'space-between' }}
                    >
                        <SANStopwatchStyled ref={stopwatchRef} />
                        <SANButton
                            size='small'
                            variant='outlined'
                            uppercase
                            bold
                            ml={{ xs: 'xl', _: 'md' }}
                            onClick={validatePractice}
                        >
                            {t('questionsDatabase.question.endPracticeButton')}
                        </SANButton>
                    </SANBox>
                ),
                SessionTitleProps: {
                    title: (
                        <SANBox display='flex' alignItems='center'>
                            <SANTypography level={4} mr='xs'>
                                {t('questionsDatabase.question.title')}{' '}
                                {currentIndex + 1}
                            </SANTypography>
                            <SANTypography variant='body1' color='grey.5'>
                                {stats.total > 999
                                    ? `/ 999+`
                                    : `/ ${stats.total}`}
                            </SANTypography>
                        </SANBox>
                    )
                }
            }}
        >
            <Switch>
                <Route path={`${url}/pratica`} component={FLXPractice} />
                <Route path={`${url}/filtro`} component={FLXFilter} />
                <Route
                    path={[`${url}/`, `${url}`]}
                    render={() => <Redirect to={`${url}/pratica`} />}
                />
            </Switch>
        </SANPage>
    )
}

export default FLXQuestion
