import React from 'react'

import { useTranslation } from 'react-i18next'
import {
    SANTypography,
    SANBox,
    SANRow,
    SANCol,
    SANSelectList
} from '@sanar/components'

import subjectImg from 'Assets/images/exam-filter/subject-theme.svg'

import { useExamFilterContext } from './Context'
import { NextButton, PrevButton } from './'

interface IFLXFilterSubjectProps {}

const FLXFilterSubject: React.FC<IFLXFilterSubjectProps> = () => {
    const { t } = useTranslation('sanarflix')
    const { setCurrentTab, state, handleSubject } = useExamFilterContext()

    return (
        <SANBox
            px={{ md: '8', _: 'md' }}
            pb={{ md: 'xxl', _: 'xl' }}
            pt={{ md: '8', _: 'md' }}
        >
            <SANRow align='top' justify='space-between' type='flex' gutter={24}>
                <SANCol xs={24} sm={12} md={12}>
                    <SANTypography
                        color='grey.6'
                        fontSize={{ md: 'xl', _: 'lg' }}
                    >
                        {t('examFilter.subject.description')}
                    </SANTypography>
                    <SANBox
                        as='img'
                        src={subjectImg}
                        alt='Disciplina'
                        width='100%'
                        height={{ sm: 250, _: 124 } as any}
                        mb={{ xs: '0', _: 'md' }}
                    />
                </SANCol>
                <SANCol xs={24} sm={12} md={12}>
                    <SANSelectList
                        disabled={!state.college}
                        placeholder={t('examFilter.subject.select')}
                        onChange={handleSubject}
                        items={[
                            { value: '1', label: 'Disciplina 1' },
                            { value: '2', label: 'Disciplina 2' }
                        ]}
                        value={state.subject}
                    />
                </SANCol>
            </SANRow>
            <SANBox
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mt={{ md: 'xxl', _: 'xl' }}
            >
                <PrevButton onClick={() => setCurrentTab('college')} />
                <NextButton onClick={() => setCurrentTab('theme')} />
            </SANBox>
        </SANBox>
    )
}

export default FLXFilterSubject
