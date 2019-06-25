import { createContext, useContext } from 'react'
import { Question } from '../../Apollo/Questions/question'
import { Speciality } from '../../Apollo/Questions/speciality'
import { Tag } from '../../Apollo/Questions/tag'

export enum QuestionPageType {
    Filter,
    Question,
    EndSession,
}

export interface IFormFilterState {
    selectedState: any,
    selectedYear: any,
    isCommentedByExpert: boolean
}

export interface VideoParams {
    enrollmentId: string
    contentId: string
    moduleId: string
    moduleName: string;
    subSpecialtyName: string;
    specialtyName: string;

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

    questions: Question[],
    setQuestions: (questions: Question[]) => void

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

export const QuestionsContext = createContext<IQuestionsContext>(null)
export const useQuestionsContext = () => useContext(QuestionsContext)
