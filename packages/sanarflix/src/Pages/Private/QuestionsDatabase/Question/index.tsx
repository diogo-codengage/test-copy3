import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import {
    SANPage,
    SANButton,
    SANStopwatch,
    SANBox,
    SANTypography,
    SANModal,
    SANModalFooter
} from '@sanar/components'

import { useQuestionsContext } from '../Context'

import FLXPractice from './Practice'
import FLXFilter from './Filter'

const SANStopwatchStyled = styled(SANStopwatch)`
    && {
        background-color: ${theme('colors.primary-10')};
    }
`

const FinishWithoutQuestions = ({ onClose, onRestart, ...props }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANModal
            title={t('questionsDatabase.question.endPractice.modal.title')}
            centered
            closable={false}
            {...props}
        >
            <SANTypography variant='subtitle1' mb='xl'>
                {t('questionsDatabase.question.endPractice.modal.subtitle')}
            </SANTypography>
            <SANModalFooter>
                <SANButton
                    size='small'
                    mr='md'
                    variant='text'
                    uppercase
                    bold
                    onClick={onClose}
                >
                    {t('questionsDatabase.question.endPractice.modal.close')}
                </SANButton>
                <SANButton
                    size='small'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={onRestart}
                >
                    {t('questionsDatabase.question.endPractice.modal.restart')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

const GetOutPractice = ({ onConfirm, ...props }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANModal
            title={t('questionsDatabase.question.exit.title')}
            centered
            closable={false}
            {...props}
        >
            <SANTypography variant='subtitle1' mb='xl'>
                {t('questionsDatabase.question.exit.subtitle')}
            </SANTypography>
            <SANModalFooter>
                <SANButton
                    size='small'
                    mr='md'
                    variant='text'
                    uppercase
                    bold
                    onClick={props.onCancel}
                >
                    {t('global.no')}
                </SANButton>
                <SANButton
                    size='small'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={onConfirm}
                >
                    {t('global.yes')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

const FLXQuestion = ({ match: { url }, history }) => {
    const { t } = useTranslation('sanarflix')
    const {
        stopwatchRef,
        stats,
        setStats,
        currentIndex,
        totalAnsweredQuestions,
        reset
    } = useQuestionsContext()
    const [visibleFinish, setVisibleFinish] = useState(false)
    const [visibleExit, setVisibleExit] = useState(false)

    const validatePractice = () => {
        if (
            totalAnsweredQuestions === 0 ||
            totalAnsweredQuestions === stats.skipped
        ) {
            setVisibleFinish(true)
            return
        } else {
            !!stopwatchRef.current &&
                setStats(old => ({ ...old, time: stopwatchRef.current.time() }))
            history.push('/portal/banco-questoes/finalizado')
        }
    }

    const onClose = () => {
        reset()
        history.push('/portal/banco-questoes/filtro')
    }

    const onRestart = () => {
        reset()
        setVisibleFinish(false)
    }

    const onConfirm = () => {
        history.push('/portal/banco-questoes/finalizado')
        setVisibleExit(false)
    }

    useEffect(() => {
        const unblock = history.block(({ pathname }) => {
            const route =
                pathname.includes('banco-questoes/perguntas') ||
                pathname.includes('banco-questoes/finalizado')
            if (
                !route &&
                totalAnsweredQuestions > 0 &&
                totalAnsweredQuestions > stats.skipped
            ) {
                setVisibleExit(true)
                return false
            } else {
                return true
            }
        })
        return () => unblock()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalAnsweredQuestions, stats])

    return (
        <>
            <FinishWithoutQuestions
                onCancel={() => setVisibleFinish(false)}
                visible={visibleFinish}
                onClose={onClose}
                onRestart={onRestart}
            />
            <GetOutPractice
                onCancel={() => setVisibleExit(false)}
                visible={visibleExit}
                onConfirm={onConfirm}
            />
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
                            justifyContent={{
                                sm: 'flex-end',
                                _: 'space-between'
                            }}
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
                                {t(
                                    'questionsDatabase.question.endPractice.button'
                                )}
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
        </>
    )
}

export default FLXQuestion
