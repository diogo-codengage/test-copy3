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

    const [questionsRequests, setQuestionsRequests] = useState(0)

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
        setLoading(true)
        BFFService.getSpecialties().then((specialties) => {
            setLoading(false)
            setAllSpecialties(specialties)
            setAllTags(specialties.flatMap(s => s.tags).concat( specialties
                .flatMap(s => s.children).flatMap(s => s.tags)));
        })
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

        questionsRequests,
        setQuestionsRequests,

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

    //check all load
    if(!!course) {
        if(loading !== (allSpecialties.length === 0 || allTags.length === 0)){
            setLoading(!loading)
        }
    }

    return (
        <QuestionsContext.Provider value={value}>
            <QuestionsTemplate/>
        </QuestionsContext.Provider>
    )
}
