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

import { withFLXExamFilterProvider, useClassroomContext } from './Context'
import FLXFilterCollege from './College'
import FLXFilterSubject from './Subject'
import FLXFilterTheme from './Theme'
import FLXFilterSemester from './Semester'

interface IFLXExamFilterProps {}

const Title = props => (
    <SANTypography fontWeight='bold' fontSize='lg' {...props} />
)

export const NextButton = ({ onClick }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANButton
            variant='outlined'
            color='primary'
            size='small'
            uppercase
            bold
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

const FLXExamFilter: React.FC<IFLXExamFilterProps> = () => {
    const { t } = useTranslation('sanarflix')
    const { currentTab, setCurrentTab, handleSubmit } = useClassroomContext()
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
                            key='college'
                        >
                            <FLXFilterCollege />
                        </SANTabPane>
                        <SANTabPane
                            tab={<Title>{t('examFilter.subject.title')}</Title>}
                            key='subject'
                        >
                            <FLXFilterSubject />
                        </SANTabPane>
                        <SANTabPane
                            tab={<Title>{t('examFilter.theme.title')}</Title>}
                            key='theme'
                        >
                            <FLXFilterTheme />
                        </SANTabPane>
                        <SANTabPane
                            tab={
                                <Title>{t('examFilter.semester.title')}</Title>
                            }
                            key='semester'
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
                            onClick={handleSubmit}
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
