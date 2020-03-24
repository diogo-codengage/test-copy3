import React from 'react'
import { theme, prop } from 'styled-tools'

import {
    SANButton,
    SANEvaIcon,
    SANListItem,
    SANStyled,
    SANTypography
} from '@sanar/components'
import { IExam } from 'Apollo/Exams/Queries/exams'
import question from '../../../Assets/images/exams/question.png'
import { useTranslation } from 'react-i18next'

const Image = SANStyled.img`
    width: 20px;
    margin-bottom: 4px;
`

const goToClassroom = (item: IExam) => {
    // TODO redirect to practice area
    console.log('treinar >>>> ', item)
    window.analytics.track('Practice Exam Clicked', {examId: item.id})
}

export const renderItem = (item: IExam, t) => {
    return (
        <SANListItem>
            <SANTypography strong fontSize={{md: 2}} mb={2}>
                {item.title}
                <SANButton
                    color='primary'
                    variant='solid'
                    uppercase
                    blockOnlyMobile
                    style={{ width: '132px', float: 'right' }}
                    onClick={() => goToClassroom(item)}
                >
                    <SANEvaIcon name='edit-2-outline' style={{ marginRight: '6px' }}/>{t('exams.list.train')}
                </SANButton>
            </SANTypography>
            <SANTypography fontSize={{md: 1}}>
                <Image src={question}/> {item.questionsCount} {t('exams.list.questions')}
            </SANTypography>
        </SANListItem>
    )
}

export const EmptyExamsLabel = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <>
            <SANTypography
                fontSize={{ md: 2 }}
                color='grey.7'
                textAlign='left'
                mb={15}
            >
                {t('exams.list.emptySubtitle')}
            </SANTypography>
        </>
    )
}

export const ExamsCount = SANStyled.span<{direction}>`
    float: ${prop('direction')};
    
    ${theme('mediaQueries.down.md')} {
        visibility: hidden;
    }
`