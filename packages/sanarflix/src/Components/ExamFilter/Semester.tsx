import React from 'react'

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

import semesterImg from 'Assets/images/exam-filter/semester.svg'

import { useClassroomContext } from './Context'
import { PrevButton } from './'

interface IFLXFilterSemesterProps {}

const TextCol = styled(SANCol)`
    ${theme('mediaQueries.down.sm')} {
        order: 2;
    }
`

const FLXFilterSemester: React.FC<IFLXFilterSemesterProps> = () => {
    const { setCurrentTab } = useClassroomContext()
    return (
        <SANBox
            px={{ md: '8', _: 'md' }}
            pb={{ md: 'xxl', _: 'xl' }}
            pt={{ md: '8', _: 'md' }}
        >
            <SANRow align='top' justify='space-between' type='flex' gutter={24}>
                <SANCol xs={24} sm={12}>
                    <SANBox
                        display='flex'
                        flexDirection='column'
                        alignItems='flex-start'
                        justifyContent='space-between'
                    >
                        <SANTypography
                            color='grey.6'
                            fontSize={{ md: 'xl', _: 'lg' }}
                            mb={{ sm: '0', _: 'md' }}
                        >
                            Selecione o ano e semestre da prova que deseja
                            estudar
                        </SANTypography>

                        <SANSelect
                            allowClear
                            placeholder='Selecionar o ano/semestre'
                            size='large'
                        >
                            <SANSelectOption value='1'>2020.1</SANSelectOption>
                            <SANSelectOption value='1'>2019.2</SANSelectOption>
                            <SANSelectOption value='1'>2019.1</SANSelectOption>
                        </SANSelect>
                        <PrevButton onClick={() => setCurrentTab('theme')} />
                    </SANBox>
                </SANCol>
                <SANCol xs={24} sm={12}>
                    <SANBox
                        as='img'
                        src={semesterImg}
                        alt='Semestre'
                        width='100%'
                        height={{ sm: 252, _: 108 } as any}
                    />
                </SANCol>
            </SANRow>
        </SANBox>
    )
}

export default FLXFilterSemester
