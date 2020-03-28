import React, { useCallback } from 'react'

import { SANModal, ISANModalProps } from '../Modal'
import { SANBox, SANTypography } from 'Components/Atoms'
import { theme, switchProp, ifProp } from 'styled-tools'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

interface ISANExamsQuestionMapPropsItem {
    status?: 'correct' | 'wrong' | 'skipped'
}

interface ISANExamsQuestionMapIndicatorProps
    extends ISANExamsQuestionMapPropsItem {}

export interface ISANExamsQuestionMapProps extends ISANModalProps {
    items: Partial<ISANExamsQuestionMapPropsItem>[]
}

const SANExamsQuestionMapStyled = styled(SANModal)`
    position: relative;

    & .ant-modal-body {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const IndicatorStyled = styled(SANBox)<ISANExamsQuestionMapIndicatorProps>`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid none;
    font-weight: bold;

    ${switchProp(
        'status',
        {
            correct: css`
                border-color: ${theme('colors.success')};
                color: white;
                background: url(${theme('assets.questionMap.correct')})
                    no-repeat ${theme('colors.success')};
            `,
            wrong: css`
                border-color: ${theme('colors.error')};
                color: white;
                background: url(${theme('assets.questionMap.wrong')}) no-repeat
                    ${theme('colors.error')};
            `,
            skipped: css`
                border-color: ${theme('colors.yellow.1')};
                color: white;
                background: url(${theme('assets.questionMap.wrong')}) no-repeat
                    ${theme('colors.yellow.1')};
            `
        },
        css`
            color: ${theme('colors.grey-solid.5')};
            border: 1px solid ${theme('colors.grey-solid.4')};
        `
    )};
`

const SubtitleStyled = styled(SANBox)`
    position: absolute;
    bottom: -40px;
    left: 0;
    display: flex;
`

const SubtitleStyledItem = styled(SANBox)`
    display: flex;
    align-items: center;
    margin-right: 16px;
`

const SubtitleIndicatorStyled = styled<ISANExamsQuestionMapPropsItem>(
    IndicatorStyled
)`
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background-position: center;
`

const SANExamsQuestionMap = ({
    items,
    ...props
}: ISANExamsQuestionMapProps) => {
    const { t } = useTranslation('sanarflix')

    const renderItems = useCallback(
        (item: ISANExamsQuestionMapPropsItem, index) => (
            <IndicatorStyled key={index} status={item.status}>
                {index + 1}
            </IndicatorStyled>
        ),
        [items]
    )

    return (
        <SANExamsQuestionMapStyled
            width={400}
            centered
            title='Mapa de questões'
            {...props}
        >
            <SANBox
                display='grid'
                gridTemplateColumns='repeat(5, 40px)'
                gridColumnGap='10px'
                gridRowGap='10px'
            >
                {items.map(renderItems)}
            </SANBox>

            <SubtitleStyled>
                <SubtitleStyledItem>
                    <SubtitleIndicatorStyled status='correct' />
                    <SANTypography strong color='#fff'>
                        {t('exams.questionMap.corrects')}
                    </SANTypography>
                </SubtitleStyledItem>
                <SubtitleStyledItem>
                    <SubtitleIndicatorStyled status='wrong' />
                    <SANTypography strong color='#fff'>
                        {t('exams.questionMap.wrong')}
                    </SANTypography>
                </SubtitleStyledItem>
                <SubtitleStyledItem>
                    <SubtitleIndicatorStyled status='skipped' />
                    <SANTypography strong color='#fff'>
                        {t('exams.questionMap.skipped')}
                    </SANTypography>
                </SubtitleStyledItem>
            </SubtitleStyled>
        </SANExamsQuestionMapStyled>
    )
}

export default SANExamsQuestionMap
