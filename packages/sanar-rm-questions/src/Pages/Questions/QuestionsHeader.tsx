import React, { useState } from 'react'
import { RMHeader } from '../../Components/RMHeader'
import { QuestionPageType, useQuestionsContext } from './QuestionsContext'
import { RMSplashLoader } from '../../Components/RMSplashLoader'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESModal from 'sanar-ui/dist/Components/Atoms/Modal'

import { isLocalhost } from '../../Util/environment'

export const QuestionsHeader = () => {

    const {
        loading,
        course,
        currentPage,
        setCurrentPage,

        questionsRequests,
        setCurrentQuestion,
        setCurrentAnswerId,

        loadMoreQuestions,
    } = useQuestionsContext()

    const [loadingQuestions, setLoadingQuestions] = useState(false)

    const [showModalFinish, setShowModalFinish] = useState(false)
    const [showModalNoQuestionsForFilter, setShowModalNoQuestionsForFilter ] = useState(false)

    const isFromCourse = () => {
        return !!course
    }

    if (loading)
        return <RMSplashLoader/>

    let menuAction = <span/>

    if (currentPage === QuestionPageType.Filter) {

        menuAction = <ESButton
            color='primary'
            variant='solid'
            uppercase
            blockOnlyMobile
            loading={loadingQuestions}
            onClick={() => {
                setLoadingQuestions(true)
                loadMoreQuestions(true).then( success => {
                    setLoadingQuestions(false)
                    if(success){
                        setCurrentQuestion(null)
                        setCurrentAnswerId(null)
                        setCurrentPage(QuestionPageType.Question)
                    } else {
                        setShowModalNoQuestionsForFilter(true)
                    }
                })
            }}
        > {questionsRequests === 0 ? 'INICIAR PRÁTICA' : 'VOLTAR A PRÁTICA'} </ESButton>

    }

    if (currentPage === QuestionPageType.Question) {

        if (isFromCourse()) {

            menuAction = <ESButton
                color='primary'
                variant='outlined'
                uppercase
                blockOnlyMobile
                onClick={
                    () => {
                        const uri = `${isLocalhost() ? 'http://localhost:8080' : ''}`
                            + `/#/meus-cursos/${course.enrollmentId}/modulos/${course.moduleId}/${course.contentId}?back`
                        window.open(uri, '_self')
                    }
                }
            >VOLTAR PARA AULA</ESButton>

        } else {

            menuAction = <ESButton
                color='primary'
                variant='solid'
                uppercase
                blockOnlyMobile
                onClick={() => setShowModalFinish(true)}
            >FINALIZAR PRÁTICA</ESButton>

        }

    }

    return <>
        <RMHeader
            title={isFromCourse() ? course.moduleName : 'Área de Prática'}
            rightElement={menuAction}
        />
        <ESModal
            title={'Encerrar aula'}
            visible={showModalFinish}
            centered={'Centered'}
            onCancel={() => {
                setShowModalFinish(false)
            }}
        >
            <p>Tem certeza que deseja sair da página de prática?</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ESButton
                    color='outlined'
                    variant='text'
                    uppercase
                    blockOnlyMobile
                    onClick={() => {
                        setShowModalFinish(false)
                    }}
                >VOLTAR</ESButton>
                <ESButton
                    color='primary'
                    variant='solid'
                    uppercase
                    blockOnlyMobile
                    onClick={() => {
                        setShowModalFinish(false)
                        window.open('/', '_self')
                    }}
                >CONFIRMAR</ESButton>

            </div>
        </ESModal>

        <ESModal
            title={'Parece que algo deu errado'}
            visible={showModalNoQuestionsForFilter}
            centered={'Centered'}
            onCancel={() => () => setShowModalNoQuestionsForFilter(false) }
        >
            <p>Opa, não existem questões para o filtro atual.</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ESButton
                    color='primary'
                    variant='solid'
                    uppercase
                    blockOnlyMobile
                    onClick={() => setShowModalNoQuestionsForFilter(false) }
                >OK</ESButton>
            </div>
        </ESModal>

    </>
}
