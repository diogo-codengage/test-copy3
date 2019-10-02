import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANButton } from '@sanar/components'
import { ICourse } from 'Apollo/QuestionsDatabase/Queries/courses'
import { ITheme } from 'Apollo/QuestionsDatabase/Queries/themes'

import FLXSubheader from './Subheader'
import { FLXSelectsFilter } from '../Filter'
import { useQuestionsContext } from '../Context'

const FLXFilter = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
    const {
        startStopwatch,
        pauseStopwatch,
        state,
        dispatch
    } = useQuestionsContext()
    const [selectedCourses, setSelectedCourses] = useState<ICourse[]>([])
    const [selectedThemes, setSelectedThemes] = useState<ITheme[]>([])

    const handleStart = () => {
        const newFilter = { selectedCourses, selectedThemes }
        if (JSON.stringify(state.filter) !== JSON.stringify(newFilter)) {
            dispatch({
                type: 'filter',
                filter: {
                    selectedCourses,
                    selectedThemes
                }
            })
        }

        history.push('./pratica')
    }

    useEffect(() => {
        !!state.filter.selectedCourses &&
            setSelectedCourses(state.filter.selectedCourses)
        !!state.filter.selectedThemes &&
            setSelectedThemes(state.filter.selectedThemes)
    }, [state.filter])

    useEffect(() => {
        pauseStopwatch()
        return () => startStopwatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <FLXSubheader>
                <SANButton
                    size='small'
                    variant='solid'
                    color='primary'
                    bold
                    uppercase
                    onClick={handleStart}
                >
                    {t('questionsDatabase.question.continue')}
                </SANButton>
            </FLXSubheader>
            <FLXSelectsFilter
                setSelectedCourses={setSelectedCourses}
                selectedCourses={selectedCourses}
                setSelectedThemes={setSelectedThemes}
                selectedThemes={selectedThemes}
            />
        </>
    )
}

export default withRouter(FLXFilter)
