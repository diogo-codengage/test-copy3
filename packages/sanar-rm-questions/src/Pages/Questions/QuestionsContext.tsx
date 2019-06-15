import React, { createContext, useContext, useState } from 'react'
import { Question } from '../../Apollo/question'
import { Speciality } from '../../Apollo/speciality'
import { QuestionsInputFilter } from '../../Apollo/QuestionsInputFilter'
import { Tag } from '../../Apollo/tag'

export enum QuestionPageType {
    Filter,
    Question,
    EndSession,
}

export interface IFormFilterState {
    selectedState: any,
    selectedYear: number,
    isCommentedByExpert: boolean
}

interface IQuestionsContext {

    loading: boolean
    setLoading: (loading: boolean) => void

    courseName: string
    setCourseName: (courseName: string) => void

    currentPage: QuestionPageType
    setCurrentPage: (currentPage: QuestionPageType) => void

    filters: QuestionsInputFilter,
    setFilters: (filters: QuestionsInputFilter) => void

    currentQuestion?: Question
    setCurrentQuestion: (currentQuestion?: Question) => void

    currentAnswerId?: string
    setCurrentAnswerId: (answerId?: string) => void

    questions: Question[],
    setQuestions: (questions: Question[]) => void

    isFromCourse?
    courseLinkReturn?

    totalCorrect: number
    totalWrong: number
    totalSkipped: number
    setTotalCorrect: (v: number) => void
    setTotalWrong: (v: number) => void
    setTotalSkipped: (v: number) => void
    increaseTotalCorrect: () => void
    increaseTotalWrong: () => void
    increaseTotalSkipped: () => void

    specialties: Speciality[]
    setSpecialties: (specialties: Speciality[]) => void

    formFilterState: IFormFilterState
    setFormFilterState: (filters: IFormFilterState) => void

    selectedSpecialties: Speciality[]
    setSelectedSpecialties: (selectedSpecialties: Speciality[]) => void
    selectedSubSpecialties: Speciality[]
    setSelectedSubSpecialties: (selectedSubSpecialties: Speciality[]) => void
    selectedTags: Tag[]
    setSelectedTags: (selectedTags: Tag[]) => void

    allSpecialties: Speciality[]
    setAllSpecialties: (selectedSpecialties: Speciality[]) => void
    allSubSpecialties: Speciality[]
    setAllSubSpecialties: (selectedSubSpecialties: Speciality[]) => void
    allTags: Tag[]
    setAllTags: (selectedTags: Tag[]) => void

    showAdvancedFilters: boolean
    setShowAdvancedFilters: (showAdvancedFilters: boolean) => void

}

const QuestionsContext = createContext<IQuestionsContext>(null)
export const useQuestionsContext = () => useContext(QuestionsContext)

export const QuestionsContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)

    const [courseName, setCourseName] = useState()

    const [currentPage, setCurrentPage] = useState(QuestionPageType.Filter)
    const [filters, setFilters] = useState<QuestionsInputFilter>({})

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

    const value = {
        loading,
        setLoading,

        courseName,
        setCourseName,

        currentPage,
        setCurrentPage,
        filters,
        setFilters,

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
    return (<QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>)
}
