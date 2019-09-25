import { createContext, useContext } from 'react'
import { ISelectOption } from '../../Components/ESSelect'
import { Question } from '../../BFF/question'
import { Speciality } from '../../BFF/speciality'
import { Tag } from '../../BFF/tag'

export enum QuestionPageType {
    Filter,
    Question,
}

export interface VideoParams {
    enrollmentId: string
    contentId: string
    moduleId: string
    moduleName: string;
    subSpecialtyName: string;
    specialtyName: string;
    courseId: string;
}

export interface IQuestionsContext {

    loading: boolean
    setLoading: (loading: boolean) => void

    course?: VideoParams

    currentPage: QuestionPageType
    setCurrentPage: (currentPage: QuestionPageType) => void

    currentQuestion?: Question
    setCurrentQuestion: (currentQuestion?: Question) => void

    currentAnswerId?: string
    setCurrentAnswerId: (answerId?: string) => void

    questions: Question[]
    setQuestions: (questions: Question[]) => void

    questionsRequests: number,
    setQuestionsRequests: (value: number) => void,

    noMoreQuestions: boolean
    setNoMoreQuestion: (value: boolean) => void

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

    selectedState: string
    setSelectedState: (value: string) => void
    selectedYears: ISelectOption[]
    setSelectedYears: (values: ISelectOption[]) => void
    isCommentedByExpert: boolean
    setCommentedByExpert: (value: boolean) => void

    selectedInstitutions: ISelectOption[]
    setSelectedInstitutions: (values: ISelectOption[]) => void

    selectedSpecialties: Speciality[]
    setSelectedSpecialties: (selectedSpecialties: Speciality[]) => void
    selectedSubSpecialties: Speciality[]
    setSelectedSubSpecialties: (selectedSubSpecialties: Speciality[]) => void
    selectedTags: Tag[]
    setSelectedTags: (selectedTags: Tag[]) => void
    selectedCategories: ISelectOption[]
    setSelectedCategories: (selectedTags: ISelectOption[]) => void

    allSpecialties: Speciality[]
    allTags: Tag[]
    allInstitutions: ISelectOption[]
    allCategories: ISelectOption[]

    showAdvancedFilters: boolean
    setShowAdvancedFilters: (showAdvancedFilters: boolean) => void

    loadMoreQuestions: (clearOld: boolean, sendEvent?: boolean) => Promise<Boolean>
}

export const QuestionsContext = createContext<IQuestionsContext>(null)
export const useQuestionsContext = () => useContext(QuestionsContext)

