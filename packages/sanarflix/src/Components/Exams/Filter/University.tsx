import React from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import {
    SANTypography,
    SANBox,
    SANSelect,
    SANSelectOption,
    SANCheckbox,
    SANRow,
    SANCol
} from '@sanar/components'

import collegeImg from 'Assets/images/exam-filter/college.png'

import { useExamFilterContext } from './Context'
import { NextButton } from './'

interface IFLXFilterUniversityProps {
    universityId: string
}

const TextCol = styled(SANCol)`
    ${theme('mediaQueries.down.sm')} {
        order: 2;
    }
`

const renderItem = item => (
    <SANSelectOption key={item.id} value={item.id}>
        {item.name}
    </SANSelectOption>
)

const FLXFilterUniversity: React.FC<IFLXFilterUniversityProps> = (props) => {
    const { t } = useTranslation('sanarflix')
    const {
        setCurrentTab,
        state,
        handleUniversity,
        universities,
        loadingUniversities
    } = useExamFilterContext()

    const showCheckbox = () => {
        return universities.some(item => item.id === props.universityId)
    }

    return (
        <SANBox px={{ md: '8', _: 'md' }} pb={{ md: 'xxl', _: 'xl' }}>
            <SANRow
                align='middle'
                justify='space-between'
                type='flex'
                gutter={16}
            >
                <TextCol xs={24} sm={10} md={9}>
                    <SANTypography
                        color='grey.6'
                        fontSize={{ md: 'xl', _: 'lg' }}
                        mb={{ sm: '0', _: 'md' }}
                    >
                        {t('examFilter.college.description')}
                    </SANTypography>
                </TextCol>
                <SANCol xs={24} sm={14} md={15}>
                    <SANBox
                        as='img'
                        src={collegeImg}
                        alt='Faculdade'
                        width='100%'
                        height={{ sm: 'auto', _: 108 } as any}
                        ml={{ md: 'md', _: '0' } as any}
                        mt={{ md: '0', _: 'xs' } as any}
                    />
                </SANCol>
            </SANRow>
            <SANRow
                align='bottom'
                justify='space-between'
                type='flex'
                gutter={16}
            >
                <SANCol xs={24} sm={19} md={12}>
                    <SANBox display='flex' flexDirection='column'>
                        {showCheckbox() && (
                            <SANBox mb='xs'>
                                <SANCheckbox onChange={(e) => e.target.checked ? handleUniversity(props.universityId) : handleUniversity('')}>
                                    <SANTypography
                                        fontSize='md'
                                        as='span'
                                        color='grey.6'
                                    >
                                        {t('examFilter.college.checkbox')}
                                    </SANTypography>
                                </SANCheckbox>
                            </SANBox>
                        )}
                        <SANSelect
                            allowClear
                            placeholder={t('examFilter.college.select')}
                            size='large'
                            value={state.university || undefined}
                            onChange={handleUniversity}
                            loading={loadingUniversities}
                        >
                            {universities.map(renderItem)}
                        </SANSelect>
                    </SANBox>
                </SANCol>
                <SANCol xs={24} sm={5} md={3}>
                    <SANBox
                        display='flex'
                        justifyContent='flex-end'
                        mt={{ sm: 0, _: 'lg' }}
                    >
                        <NextButton
                            disabled={!state.university}
                            onClick={() => setCurrentTab('discipline')}
                        />
                    </SANBox>
                </SANCol>
            </SANRow>
        </SANBox>
    )
}

export default FLXFilterUniversity
