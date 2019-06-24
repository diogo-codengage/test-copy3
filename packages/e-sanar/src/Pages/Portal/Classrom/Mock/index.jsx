import React from 'react'

import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESLessonHeader, {
    ESLessonHeaderExtra
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { useClassroomContext } from '../Context'
import SANQuiz from 'Components/Quiz'

const SANClassroomMock = () => {
    const { t } = useTranslation('esanar')
    const { current } = useClassroomContext()

    return (
        <div className='classroom__mock'>
            <ESLessonHeader
                leftChildren={
                    <div className='classroom__mock-header--left'>
                        <ESButton circle variant='text' className='menu-button'>
                            <ESEvaIcon name='menu-outline' />
                        </ESButton>
                        <div>
                            <ESTypography ellipsis level={5} className='title'>
                                {current.quiz.title}
                            </ESTypography>
                            <ESTypography
                                variant='subtitle2'
                                className='subtitle'
                                ellipsis
                            >
                                {`${t('global.subject')} 3, ${t(
                                    'global.activity'
                                )} ${current.index + 1}`}
                            </ESTypography>
                        </div>
                    </div>
                }
                rightChildren={
                    <ESLessonHeaderExtra
                        previousLesson='Anterior'
                        nextLesson='Próxima'
                    />
                }
            />
            <SANQuiz quiz={current.quiz} mock />
        </div>
    )
}

export default SANClassroomMock
