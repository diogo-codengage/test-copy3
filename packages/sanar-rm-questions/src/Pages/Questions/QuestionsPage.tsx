import React, { useState } from 'react'

import {
    QuestionsContext,
    QuestionPageType,
    IQuestionsContext,
    VideoParams
} from './QuestionsContext'
import { QuestionsTemplate } from './QuestionsTemplate'
import { RouteComponentProps } from 'react-router'
import { BFFService } from '../../BFF/BFFService'

interface IRouteProps {
    videoParams
}

interface IProps extends RouteComponentProps<IRouteProps> {
}

export const QuestionsPage = (props: IProps) => {

    const [started, setStarted] = useState(false)

    const [loading, setLoading] = useState(false)

    let course: VideoParams = null
    if (props.match.params.videoParams) {
        course = JSON.parse(atob(props.match.params.videoParams))
    }

    const [currentPage, setCurrentPage] = useState(!!course ? QuestionPageType.Question : QuestionPageType.Filter)

    const [currentQuestion, setCurrentQuestion] = useState()
    const [currentAnswerId, setCurrentAnswerId] = useState()
    const [questions, setQuestions] = useState([])

    const [totalCorrect, setTotalCorrect] = useState(0)
    const [totalWrong, setTotalWrong] = useState(0)
    const [totalSkipped, setTotalSkipped] = useState(0)

    const [specialties, setSpecialties] = useState()

    const [selectedSpecialties, setSelectedSpecialties] = useState([])
    const [selectedSubSpecialties, setSelectedSubSpecialties] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    const [selectedStates, setSelectedStates] = useState([])
    const [selectedYears, setSelectedYears] = useState([])
    const [isCommentedByExpert, setCommentedByExpert] = useState(false)

    const [allSpecialties, setAllSpecialties] = useState([])
    const [allSubSpecialties, setAllSubSpecialties] = useState([])
    const [allTags, setAllTags] = useState([])

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

    const increaseTotalCorrect = () => {
        setTotalCorrect(totalCorrect + 1)
    }

    const increaseTotalSkipped = () => {
        setTotalSkipped(totalSkipped + 1)
    }

    const increaseTotalWrong = () => {
        setTotalWrong(totalWrong + 1)
    }

    const onInit = () => {

        console.log('on init')

        BFFService.getSpecialties().then((specialties) => {
            console.log('on init end')
            console.log({specialties})
            setAllSpecialties(specialties)
        })
        BFFService.getTags().then((tags) => {
            setAllTags(tags)
        });
    }

    if (!started) {
        onInit()
        setStarted(true)
    }

    const value: IQuestionsContext = {
        loading,
        setLoading,

        course,

        currentPage,
        setCurrentPage,

        currentQuestion,
        setCurrentQuestion,
        currentAnswerId,
        setCurrentAnswerId,
        questions,
        setQuestions,

        totalCorrect,
        totalWrong,
        totalSkipped,
        setTotalCorrect,
        setTotalWrong,
        setTotalSkipped,
        increaseTotalCorrect,
        increaseTotalWrong,
        increaseTotalSkipped,

        specialties,
        setSpecialties,

        selectedSpecialties,
        setSelectedSpecialties,
        selectedSubSpecialties,
        setSelectedSubSpecialties,
        selectedTags,
        setSelectedTags,
        allSpecialties,
        setAllSpecialties,
        allSubSpecialties,
        setAllSubSpecialties,
        allTags,
        setAllTags,

        selectedStates,
        setSelectedStates,
        selectedYears,
        setSelectedYears,
        isCommentedByExpert,
        setCommentedByExpert,

        showAdvancedFilters,
        setShowAdvancedFilters
    }

    return (
        <QuestionsContext.Provider value={value}>
            <QuestionsTemplate/>
        </QuestionsContext.Provider>
    )
}
