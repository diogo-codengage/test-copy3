import React, { useState, useEffect, memo } from 'react'

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

interface IModalProps {
    onCancel: () => void
    visible: boolean
}

interface IFinishWithoutQuestionsProps extends IModalProps {
    onClose: () => void
    onRestart: () => void
}

const FinishWithoutQuestions = memo<IFinishWithoutQuestionsProps>(
    ({ onClose, onRestart, ...props }) => {
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
                        variant='text'
                        uppercase
                        bold
                        onClick={onRestart}
                    >
                        {t('practicalArea.question.endPractice.modal.restart')}
                    </SANButton>
                    <SANButton
                        size='small'
                        mr='md'
                        variant='solid'
                        color='primary'
                        uppercase
                        bold
                        onClick={onClose}
                    >
                        {t('practicalArea.question.endPractice.modal.close')}
                    </SANButton>
                </SANModalFooter>
            </SANModal>
        )
    }
)

interface IGetOutPracticeProps extends IModalProps {
    onCancel: () => void
    onConfirm: () => void
}

const GetOutPractice = memo<IGetOutPracticeProps>(({ onConfirm, ...props }) => {
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
})

const RMQuestion = memo<any>(({ match: { url }, history, location }) => {
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

    const onFinished = () => {
        !!stopwatchRef.current &&
            dispatch({
                type: 'stats',
                stats: { time: stopwatchRef.current.time() }
            })
        history.push('/inicio/area-pratica/finalizado')
    }

    const validatePractice = () => {
        if (
            totalAnsweredQuestions === 0 ||
            totalAnsweredQuestions === state.stats.skipped
        ) {
            setVisibleFinish(true)
            return
        } else {
            onFinished()
        }
    }

    const onClose = () => {
        reset()
        history.push('/inicio/area-pratica/filtro')
    }

    const onRestart = () => {
        reset()
        setVisibleFinish(false)
    }

    const onConfirm = () => {
        onFinished()
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
                    py: { sm: '8', _: 'md' }
                }}
                ContainerProps={{
                    height: '100%',
                    px: location.pathname.includes('/pratica')
                        ? { lg: 'md', _: '0' }
                        : 'md'
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
                                    {state.stats.total > 0
                                        ? state.currentIndex + 1
                                        : 0}
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
})

export default RMQuestion
