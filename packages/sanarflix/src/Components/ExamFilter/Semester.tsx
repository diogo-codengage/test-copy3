import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANTypography,
    SANBox,
    SANSelect,
    SANSelectOption,
    SANRow,
    SANCol
} from '@sanar/components'

import semesterImg from 'Assets/images/exam-filter/semester.svg'

import { useClassroomContext } from './Context'
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

const FLXFilterSemester: React.FC<IFLXFilterSemesterProps> = () => {
    const { t } = useTranslation('sanarflix')
    const { setCurrentTab, semester, setSemester } = useClassroomContext()
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
                            <SANSelect
                                style={{ width: '100%' }}
                                allowClear
                                placeholder={t('examFilter.semester.select')}
                                mode='multiple'
                                size='large'
                                onChange={setSemester}
                                value={semester}
                            >
                                <SANSelectOption value='1'>
                                    2020.1
                                </SANSelectOption>
                                <SANSelectOption value='2'>
                                    2019.2
                                </SANSelectOption>
                                <SANSelectOption value='3'>
                                    2019.1
                                </SANSelectOption>
                            </SANSelect>
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
