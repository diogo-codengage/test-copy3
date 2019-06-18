import React from 'react'
import { RMHeader } from '../../Components/RMHeader'
import { QuestionPageType, useQuestionsContext } from './QuestionsContext'
import { RMSplashLoader } from '../../Components/RMSplashLoader'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

export const QuestionsHeader = () => {

    const {
        loading,
        isFromCourse,
        course,
        currentPage,
        setCurrentPage
    } = useQuestionsContext()

    if(loading)
        return <RMSplashLoader />

    let menuAction = <span/>

    if (currentPage === QuestionPageType.Filter) {

        menuAction = <ESButton
            color='primary'
            variant='solid'
            uppercase
            blockOnlyMobile
            onClick={() => setCurrentPage(QuestionPageType.Question)}
        >INICIAR PRÁTICA</ESButton>

    }

    if( currentPage === QuestionPageType.Question){

        if(isFromCourse) {

            menuAction = <ESButton
                color='primary'
                variant='solid'
                uppercase
                blockOnlyMobile
                onClick={
                    //TODO: voltar para o curso
                    () => console.log('TODO: voltar para o curso')
                }
            >VOLTAR PARA AULA</ESButton>

        } else {

            menuAction = <ESButton
                color='primary'
                variant='solid'
                uppercase
                blockOnlyMobile
                onClick={() => setCurrentPage(QuestionPageType.EndSession)}
            >FINALIZAR PRÁTICA</ESButton>

        }

    }

    if( currentPage === QuestionPageType.EndSession) {

        menuAction = <ESButton
            color='primary'
            variant='solid'
            uppercase
            blockOnlyMobile
            onClick={() => setCurrentPage(QuestionPageType.Filter)}
        >Tentar novamente</ESButton>

    }

    return <RMHeader
        title={isFromCourse() ? course.moduleName : 'Área de Prática'}
        rightElement={menuAction}
    />
}
