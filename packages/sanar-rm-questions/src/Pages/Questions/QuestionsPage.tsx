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
import { QuestionsInputFilter } from '../../BFF/QuestionsInputFilter'
import { normalizeString } from '../../Util/normalizeString'
import { toCorrelacaoTagName } from '../../Util/corelacaoEntrePlataformas'

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

    const[ allInstitutions, setAllInstitutions] = useState([])
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

    const onInit = () => {
        setLoading(true)
        BFFService.getSpecialties().then((specialties) => {
            setLoading(false)
            setAllSpecialties(specialties)
            setAllTags(specialties.flatMap(s => s.tags).concat( specialties
                .flatMap(s => s.children).flatMap(s => s.tags)));
        })
        BFFService.getInstitutions().then(setAllInstitutions)
    }

    if (!started) {
        onInit()
        setStarted(true)
    }

    const loadMoreQuestions = async (clearOld: boolean) => {
        const filters = await getParams()
        return  BFFService.loadMoreQuestions(filters)
            .then(function({ data }) {
                setQuestionsRequests(questionsRequests + 1)
                return pushQuestions(data.questions.data, clearOld)
            })
    }

    const getParams = async ():Promise<QuestionsInputFilter> => {
        if(!!course) {
            return getParamsFromCourse()
        }
        return getParamsFromFilters()
    }

    const normalizeEndCompare = (o1: string, o2: string) =>{
        return  normalizeString(o1) === normalizeString(o2)
    }

    const getParamsFromCourse = async ():Promise<QuestionsInputFilter> => {

        const tagsIds = allTags
            .filter(t => normalizeEndCompare(t.label, toCorrelacaoTagName(course.moduleName)))
            .map(t => t.value)

        const specialtiesIds = allSpecialties.flatMap(s => s.children)
            .filter(v => normalizeEndCompare(v.label,course.subSpecialtyName))
            .map(v => v.value)

        return {
            specialtiesIds,
            institutionsIds: [],
            tagsIds,
            states: [],
            years: [],
            isCommentedByExpert: null,
        }
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
            states: selectedStates.map(s => s.value),
            years: selectedYears.map(v => v.value),
            isCommentedByExpert: isCommentedByExpert,
        }
    }

    const pushQuestions = (moreQuestions, clearOld) => {
        if(questions.length > 1){
            return;
        }
        let _questions = []

        if(!clearOld){
            _questions.push(...questions)
        }
        _questions.push(...moreQuestions)

        setQuestions(_questions)

        return Promise.resolve(_questions.length > 0)
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

        allInstitutions,
        setAllInstitutions,
        selectedInstitutions,
        setSelectedInstitutions,

        selectedStates,
        setSelectedStates,
        selectedYears,
        setSelectedYears,
        isCommentedByExpert,
        setCommentedByExpert,

        showAdvancedFilters,
        setShowAdvancedFilters,

        loadMoreQuestions,
    }

    if(!!course) {
        if(loading !== (allSpecialties.length === 0)){
            setLoading(!loading)
        }
    }

    return (
        <QuestionsContext.Provider value={value}>
            <QuestionsTemplate/>
        </QuestionsContext.Provider>
    )
}
