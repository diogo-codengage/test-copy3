import React from 'react'

import { useTranslation } from 'react-i18next'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import {SANPdfReader} from '@sanar/components'


const FLXClassRoomDocument = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <>
            <ESLessonHeader
                bookmarked
                onBookmarked={() => {}}
                leftChildren={
                    <ESLessonHeaderLeft
                        title={'Title'}
                        subtitle={'Subtitle'}
                        onClick={() => {}}
                    />
                }
                rightChildren={
                    <ESLessonHeaderExtra
                        previousLesson={'Anterior'}
                        nextLesson={'Proxima'}
                        onPrev={() => {}}
                        onNext={() => {}}
                        bookmarkLabel={t('classroom.document.bookmark')}
                        bookmarked
                        onBookmarked={() => {}}
                    />
                }
            />
            <SANPdfReader
                url='https://43748h.ha.azioncdn.net/arquivos/esanar_assuntos/59210/ARQUIVO_ASSUNTO.pdf?v=1'
            />
        </>
    )
}

export default FLXClassRoomDocument
