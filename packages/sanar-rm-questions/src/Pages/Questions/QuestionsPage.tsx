import React, { useState } from 'react'

import {
    QuestionsContext,
    IFormFilterState,
    QuestionPageType,
    IQuestionsContext,
    VideoParams
} from './QuestionsContext'
import { QuestionsTemplate } from './QuestionsTemplate'
import { RouteComponentProps } from 'react-router'

interface IRouteProps {
    videoParams
}

interface IProps extends RouteComponentProps<IRouteProps>{
}

export const QuestionsPage = (props: IProps) => {
    const [loading, setLoading] = useState(false)

    let course: VideoParams = null
    if(props.match.params.videoParams){
        course = JSON.parse(atob(props.match.params.videoParams));
    }

    const [currentPage, setCurrentPage] = useState( !!course ? QuestionPageType.Question : QuestionPageType.Filter)

    const [currentQuestion, setCurrentQuestion] = useState()
    const [currentAnswerId, setCurrentAnswerId] = useState()
    const [questions, setQuestions] = useState([])

    const [totalCorrect, setTotalCorrect] = useState(0)
    const [totalWrong, setTotalWrong] = useState(0)
    const [totalSkipped, setTotalSkipped] = useState(0)

    const [specialties, setSpecialties] = useState()

    const [formFilterState, setFormFilterState] = useState<IFormFilterState>({
        selectedState: null,
        selectedYear: null,
        isCommentedByExpert: false
    })
    const [selectedSpecialties, setSelectedSpecialties] = useState([])
    const [selectedSubSpecialties, setSelectedSubSpecialties] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    const [allSpecialties, setAllSpecialties] = useState([])
    const [allSubSpecialties, setAllSubSpecialties] = useState([])
    const [allTags, setAllTags] = useState([])

    const [ showAdvancedFilters, setShowAdvancedFilters ] = useState(false)

    const increaseTotalCorrect = () => {
        setTotalCorrect(totalCorrect + 1)
    }

    const increaseTotalSkipped = () => {
        setTotalSkipped(totalSkipped + 1)
    }

    const increaseTotalWrong = () => {
        setTotalWrong(totalWrong + 1)
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

        formFilterState,
        setFormFilterState,

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

        showAdvancedFilters,
        setShowAdvancedFilters,
    }

    return (
        <QuestionsContext.Provider value={value}>
            <QuestionsTemplate/>
        </QuestionsContext.Provider>
    )
}
