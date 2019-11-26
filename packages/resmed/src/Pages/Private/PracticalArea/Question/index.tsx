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

import RMPractice from './Practice'
import RMFilter from './Filter'

const SANStopwatchStyled = styled(SANStopwatch)`
    && {
        &:not(.es-stopwatch--stopped) {
            background-color: ${theme('colors.primary-1')};
        }
    }
`

const FinishWithoutQuestions = ({ onClose, onRestart, ...props }) => {
    const { t } = useTranslation('resmed')
    return (
        <SANModal
            title={t('practicalArea.question.endPractice.modal.title')}
            centered
            closable={false}
            {...props}
        >
            <SANTypography variant='subtitle1' mb='xl'>
                {t('practicalArea.question.endPractice.modal.subtitle')}
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
                    {t('practicalArea.question.endPractice.modal.close')}
                </SANButton>
                <SANButton
                    size='small'
                    variant='solid'
                    color='primary'
                    uppercase
                    bold
                    onClick={onRestart}
                >
                    {t('practicalArea.question.endPractice.modal.restart')}
                </SANButton>
            </SANModalFooter>
        </SANModal>
    )
}

const GetOutPractice = ({ onConfirm, ...props }) => {
    const { t } = useTranslation('resmed')
    return (
        <SANModal
            title={t('practicalArea.question.exit.title')}
            centered
            closable={false}
            {...props}
        >
            <SANTypography variant='subtitle1' mb='xl'>
                {t('practicalArea.question.exit.subtitle')}
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

const RMQuestion = ({ match: { url }, history }) => {
    const { t } = useTranslation('resmed')
    const {
        stopwatchRef,
        totalAnsweredQuestions,
        reset,
        state,
        dispatch
    } = useQuestionsContext()
    const [visibleFinish, setVisibleFinish] = useState(false)
    const [visibleExit, setVisibleExit] = useState(false)

    const validatePractice = () => {
        if (
            totalAnsweredQuestions === 0 ||
            totalAnsweredQuestions === state.stats.skipped
        ) {
            setVisibleFinish(true)
            return
        } else {
            !!stopwatchRef.current &&
                dispatch({
                    type: 'stats',
                    stats: { time: stopwatchRef.current.time() }
                })
            history.push('/portal/area-pratica/finalizado')
        }
    }

    const onClose = () => {
        reset()
        history.push('/portal/area-pratica/filtro')
    }

    const onRestart = () => {
        reset()
        setVisibleFinish(false)
    }

    const onConfirm = () => {
        history.push('/portal/area-pratica/finalizado')
        setVisibleExit(false)
    }

    useEffect(() => {
        const unblock = history.block(({ pathname }) => {
            const route =
                pathname.includes('area-pratica/perguntas') ||
                pathname.includes('area-pratica/finalizado')
            if (
                !route &&
                totalAnsweredQuestions > 0 &&
                totalAnsweredQuestions > state.stats.skipped
            ) {
                setVisibleExit(true)
                return false
            } else {
                return true
            }
        })
        return () => unblock()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalAnsweredQuestions, state.stats])

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
                ContainerProps={{
                    height: '100%'
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
                                {t('practicalArea.question.endPractice.button')}
                            </SANButton>
                        </SANBox>
                    ),
                    SessionTitleProps: {
                        title: (
                            <SANBox display='flex' alignItems='center'>
                                <SANTypography level={4} mr='xs'>
                                    {t('practicalArea.question.title')}{' '}
                                    {state.currentIndex + 1}
                                </SANTypography>
                                <SANTypography variant='body1' color='grey.5'>
                                    {state.stats.total > 999
                                        ? `/ 999+`
                                        : `/ ${state.stats.total}`}
                                </SANTypography>
                            </SANBox>
                        )
                    }
                }}
            >
                <Switch>
                    <Route path={`${url}/pratica`} component={RMPractice} />
                    <Route path={`${url}/filtro`} component={RMFilter} />
                    <Route
                        path={[`${url}/`, `${url}`]}
                        render={() => <Redirect to={`${url}/pratica`} />}
                    />
                </Switch>
            </SANPage>
        </>
    )
}

export default RMQuestion
