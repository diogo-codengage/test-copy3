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

const Image = SANStyled.img`
    width: 20px;
    margin-bottom: 4px;
`

export const renderItem = (item: IExam, t, history) => {
    return (
        <SANListItem>
            <SANTypography strong fontSize={{ md: 2 }} mb={2}>
                {item.title}
                <SANButton
                    color='primary'
                    variant='solid'
                    uppercase
                    blockOnlyMobile
                    style={{ width: '132px', float: 'right' }}
                    onClick={() =>
                        history.push(`/portal/provas/pratica/${item.id}`)
                    }
                >
                    <SANEvaIcon
                        name='edit-2-outline'
                        style={{ marginRight: '6px' }}
                    />
                    {t('exams.list.train')}
                </SANButton>
            </SANTypography>
            <SANTypography fontSize={{ md: 1 }}>
                <Image src={question} /> {item.questionsCount}{' '}
                {t('exams.list.questions')}
            </SANTypography>
        </SANListItem>
    )
}

export const ExamsCount = SANStyled.span<{ direction }>`
    float: ${prop('direction')};
    
    ${theme('mediaQueries.down.md')} {
        visibility: hidden;
    }
`
