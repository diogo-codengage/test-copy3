import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANTabs,
    SANTabPane,
    SANTypography,
    SANBox,
    SANButton,
    SANLayoutContainer,
    SANSessionTitle,
    SANDivider
} from '@sanar/components'

import { withFLXExamFilterProvider, useExamFilterContext, IState } from './Context'
import FLXFilterUniversity from './University'
import FLXFilterDiscipline from './Discipline'
import FLXFilterTheme from './Theme'
import FLXFilterSemester from './Semester'

interface IFLXExamFilterProps {
    universityId: string
    searchExams: (filters: IState) => void
}

const Title = props => (
    <SANTypography fontWeight='bold' fontSize='lg' {...props} />
)

export const NextButton = ({ onClick, disabled }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANButton
            variant='outlined'
            color='primary'
            size='small'
            uppercase
            bold
            disabled={disabled}
            onClick={onClick}
        >
            {t('examFilter.next')}
        </SANButton>
    )
}

export const PrevButton = ({ onClick }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANButton
            variant='outlined'
            color='default'
            size='small'
            uppercase
            bold
            onClick={onClick}
        >
            {t('examFilter.back')}
        </SANButton>
    )
}

const FLXExamFilter: React.FC<IFLXExamFilterProps> = (props) => {
    const { t } = useTranslation('sanarflix')
    const {
        currentTab,
        setCurrentTab,
        state
    } = useExamFilterContext()
    return (
        <SANBox
            pb={{ md: '8', _: '0' }}
            pt={{ md: '8', _: 'xxl' }}
            bg='white.10'
        >
            <SANLayoutContainer fullMobile>
                <SANSessionTitle
                    title={t('examFilter.title')}
                    subtitle={t('examFilter.subtitle')}
                />
                <SANBox
                    borderRadius={{ md: 'base', _: 0 }}
                    border='1px solid'
                    borderColor='grey.2'
                    boxShadow='1'
                    bg='white.10'
                >
                    <SANTabs
                        center
                        activeKey={currentTab}
                        onChange={setCurrentTab}
                    >
                        <SANTabPane
                            tab={<Title>{t('examFilter.college.title')}</Title>}
                            key='university'
                        >
                            <FLXFilterUniversity universityId={props.universityId}/>
                        </SANTabPane>
                        <SANTabPane
                            tab={<Title>{t('examFilter.subject.title')}</Title>}
                            key='discipline'
                            disabled={!state.university}
                        >
                            <FLXFilterDiscipline />
                        </SANTabPane>
                        <SANTabPane
                            tab={<Title>{t('examFilter.theme.title')}</Title>}
                            key='theme'
                            disabled={!state.discipline || !state.discipline.length}
                        >
                            <FLXFilterTheme />
                        </SANTabPane>
                        <SANTabPane
                            tab={
                                <Title>{t('examFilter.semester.title')}</Title>
                            }
                            key='semester'
                            disabled={!state.theme || !state.theme.length}
                        >
                            <FLXFilterSemester />
                        </SANTabPane>
                    </SANTabs>
                    <SANDivider bg='grey.1' width='100%' m='0' />
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        py={{ md: 'xxl', _: 'xl' }}
                        px='md'
                    >
                        <SANButton
                            uppercase
                            variant='solid'
                            color='primary'
                            bold
                            blockOnlyMobile
                            onClick={() => props.searchExams(state)}
                            disabled={!state.university}
                        >
                            {t('examFilter.submit')}
                        </SANButton>
                    </SANBox>
                </SANBox>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withFLXExamFilterProvider(FLXExamFilter)
