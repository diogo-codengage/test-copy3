import React, { useState } from 'react'

import { IQuestionsContext, QuestionPageType, QuestionsContext, VideoParams } from './QuestionsContext'
import { QuestionsTemplate } from './QuestionsTemplate'
import { BFFService } from '../../BFF/BFFService'
import { QuestionsInputFilter } from '../../BFF/QuestionsInputFilter'
import { Speciality } from '../../BFF/speciality'
import { Tag } from '../../BFF/tag'
import { ISelectOption } from '../../Components/ESSelect'

interface IProps {
    course?: VideoParams,
    selectedSpecialties?: Speciality[]
    selectedSubSpecialties?: Speciality[]
    selectedTags?: Speciality[]
    allSpecialties: Speciality[]
    allTags: Tag[]
    allInstitutions: ISelectOption[]
}

export const QuestionsPageProvider = (props: IProps) => {

    const course = props.course
    const [noMoreQuestions, setNoMoreQuestion] = useState(false) 

    const [loading, setLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(!!course ? QuestionPageType.Question : QuestionPageType.Filter)

    const [currentQuestion, setCurrentQuestion] = useState()
    const [currentAnswerId, setCurrentAnswerId] = useState()
    const [questions, setQuestions] = useState([])

    const [questionsRequests, setQuestionsRequests] = useState(0)

    const [totalCorrect, setTotalCorrect] = useState(0)
    const [totalWrong, setTotalWrong] = useState(0)
    const [totalSkipped, setTotalSkipped] = useState(0)

    const [specialties, setSpecialties] = useState()

    const [selectedSpecialties, setSelectedSpecialties] = useState(props.selectedSpecialties ? props.selectedSpecialties: [])
    const [selectedSubSpecialties, setSelectedSubSpecialties] = useState(props.selectedSubSpecialties ? props.selectedSubSpecialties: [])
    const [selectedTags, setSelectedTags] = useState(props.selectedTags ? props.selectedTags: [])

    const [selectedState, setSelectedState] = useState('')
    const [selectedYears, setSelectedYears] = useState([])
    const [isCommentedByExpert, setCommentedByExpert] = useState(false)

    const allSpecialties = props.allSpecialties
    const allTags = props.allTags
    const allInstitutions = props.allInstitutions

    const[ selectedInstitutions, setSelectedInstitutions ] = useState([])

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

    const loadMoreQuestions = async (clearOld: boolean) => {
        const filters = await getParamsFromFilters()
        return  BFFService.loadMoreQuestions(filters)
            .then(function({ data }) {
                if(data.questions.data.length === 0 && !clearOld){
                    setNoMoreQuestion(true)
                    return false;
                }
                setQuestionsRequests(questionsRequests + 1)
                return pushQuestions(data.questions.data, clearOld)
            }).catch((e) => {
                return false;
            })
    }

    const getParamsFromFilters = (): QuestionsInputFilter  => {

        const idsSelectedSubSpecialties = selectedSubSpecialties.map(ss => ss.value);

        return  {
            specialtiesIds: selectedSpecialties
                .filter( s => !s.children.map(ss => ss.value).find(ss => idsSelectedSubSpecialties.includes(ss) ) )
                .map(s => s.value)
                .concat(selectedSubSpecialties
                    .map(s => s.value)),
            institutionsIds: selectedInstitutions.map( i => i.value ),
            tagsIds: selectedTags.map( t => t.value),
            state: selectedState,
            years: selectedYears.map(v => v.value),
            isCommentedByExpert: isCommentedByExpert,
        }
    }

    const pushQuestions = (moreQuestions, clearOld) => {
        let _questions = []

        if(!clearOld){
            _questions.push(...questions)
        }
        _questions.push(...moreQuestions)

        setQuestions(_questions)

        return Promise.resolve(moreQuestions.length > 0)
    }

    const value: IQuestionsContext = {

        noMoreQuestions,
        setNoMoreQuestion,

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
        allTags,

        allInstitutions,
        selectedInstitutions,
        setSelectedInstitutions,

        selectedState,
        setSelectedState,
        selectedYears,
        setSelectedYears,
        isCommentedByExpert,
        setCommentedByExpert,

        showAdvancedFilters,
        setShowAdvancedFilters,

        loadMoreQuestions,
    }

    return (
        <QuestionsContext.Provider value={value}>
            <QuestionsTemplate/>
        </QuestionsContext.Provider>
    )
}
