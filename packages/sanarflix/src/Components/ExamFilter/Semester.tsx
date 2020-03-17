import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANTypography,
    SANBox,
    SANSelect,
    SANSelectOption,
    SANRow,
    SANCol,
    SANCheckbox
} from '@sanar/components'

import semesterImg from 'Assets/images/exam-filter/semester.svg'

import { useExamFilterContext } from './Context'
import { PrevButton } from './'

interface IFLXFilterSemesterProps {}

const Image = props => (
    <SANBox
        as='img'
        src={semesterImg}
        alt='Semestre'
        width='100%'
        height={{ sm: 252, _: 108 } as any}
        {...props}
    />
)

const renderItem = item => (
    <SANSelectOption key={item.value} value={item.value}>
        {item.value}
    </SANSelectOption>
)

const FLXFilterSemester: React.FC<IFLXFilterSemesterProps> = () => {
    const { t } = useTranslation('sanarflix')
    const {
        setCurrentTab,
        state,
        handleSemester,
        semesters,
        loadingSemesters
    } = useExamFilterContext()

    return (
        <SANBox
            px={{ md: '8', _: 'md' }}
            pb={{ md: 'xxl', _: 'xl' }}
            pt={{ md: '8', _: 'md' }}
        >
            <SANRow
                align='stretch'
                justify='space-between'
                type='flex'
                gutter={24}
            >
                <SANCol xs={24} sm={11}>
                    <SANBox
                        height='100%'
                        display='flex'
                        flexDirection='column'
                        alignItems='flex-start'
                        justifyContent='space-between'
                    >
                        <SANTypography
                            color='grey.6'
                            fontSize={{ md: 'xl', _: 'lg' }}
                        >
                            {t('examFilter.college.description')}
                        </SANTypography>

                        <SANBox display={{ xs: 'none', _: 'block' }}>
                            <Image height={161} />
                        </SANBox>

                        <SANBox width={{ md: 300, _: '100%' }} mb='xl'>
                            <SANBox display='flex' flexDirection='column'>
                                <SANBox mb='xs'>
                                    <SANCheckbox onChange={(e) => e.target.checked ? handleSemester(semesters.map(item => item.value)) : handleSemester([])}>
                                        <SANTypography
                                            fontSize='md'
                                            as='span'
                                            color='grey.6'
                                        >
                                            {t('examFilter.semester.checkbox')}
                                        </SANTypography>
                                    </SANCheckbox>
                                </SANBox>
                                <SANSelect
                                    style={{ width: '100%' }}
                                    allowClear
                                    placeholder={t('examFilter.semester.select')}
                                    mode='multiple'
                                    size='large'
                                    onChange={handleSemester}
                                    value={
                                        !!state.theme.length ? state.semester : []
                                    }
                                    disabled={!state.theme.length}
                                    loading={loadingSemesters}
                                >
                                    {semesters.map(renderItem)}
                                </SANSelect>
                            </SANBox>
                        </SANBox>
                        <PrevButton onClick={() => setCurrentTab('theme')} />
                    </SANBox>
                </SANCol>
                <SANCol xs={0} sm={13}>
                    <Image />
                </SANCol>
            </SANRow>
        </SANBox>
    )
}

export default FLXFilterSemester
