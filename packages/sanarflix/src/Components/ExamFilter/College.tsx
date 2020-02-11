import React from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import {
    SANTypography,
    SANBox,
    SANButton,
    SANSelect,
    SANSelectOption,
    SANCheckbox,
    SANRow,
    SANCol
} from '@sanar/components'

import collegeImg from 'Assets/images/exam-filter/college.png'

import { useClassroomContext } from './Context'
import { NextButton } from './'

interface IFLXFilterCollegeProps {}

const TextCol = styled(SANCol)`
    ${theme('mediaQueries.down.sm')} {
        order: 2;
    }
`

const FLXFilterCollege: React.FC<IFLXFilterCollegeProps> = () => {
    const { setCurrentTab } = useClassroomContext()
    return (
        <SANBox px={{ md: '9', _: 'md' }} pb={{ md: 'xxl', _: 'xl' }}>
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
                        Busque pela faculdade das provas que você quer treinar.
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
                        <SANBox mb='xs'>
                            <SANCheckbox>
                                <SANTypography
                                    fontSize='md'
                                    as='span'
                                    color='grey.6'
                                >
                                    Usar minha faculdade
                                </SANTypography>
                            </SANCheckbox>
                        </SANBox>
                        <SANSelect
                            allowClear
                            placeholder='Buscar outra faculdade'
                            size='large'
                        >
                            <SANSelectOption value='1'>1</SANSelectOption>
                        </SANSelect>
                    </SANBox>
                </SANCol>
                <SANCol xs={24} sm={5} md={3}>
                    <SANBox
                        display='flex'
                        justifyContent='flex-end'
                        mt={{ sm: 0, _: 'lg' }}
                    >
                        <NextButton onClick={() => setCurrentTab('subject')} />
                    </SANBox>
                </SANCol>
            </SANRow>
        </SANBox>
    )
}

export default FLXFilterCollege
