import React from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import {
    SANTypography,
    SANBox,
    SANRow,
    SANCol,
    SANSelectList
} from '@sanar/components'

import subjectImg from 'Assets/images/exam-filter/subject-theme.svg'

import { useClassroomContext } from './Context'
import { NextButton, PrevButton } from './'

interface IFLXFilterSubjectProps {}

const FLXFilterSubject: React.FC<IFLXFilterSubjectProps> = () => {
    const { setCurrentTab } = useClassroomContext()
    return (
        <SANBox px={{ md: '9', _: 'md' }} pb={{ md: 'xxl', _: 'xl' }} pt='8'>
            <SANRow align='top' justify='space-between' type='flex' gutter={24}>
                <SANCol xs={24} sm={12} md={12}>
                    <SANTypography
                        color='grey.6'
                        fontSize={{ md: 'xl', _: 'lg' }}
                    >
                        Escolha as disciplinas que deseja se aprofundar
                    </SANTypography>
                    <SANBox
                        as='img'
                        src={subjectImg}
                        alt='Disciplina'
                        width='100%'
                        height={{ sm: 'auto', _: 124 } as any}
                    />
                </SANCol>
                <SANCol xs={24} sm={12} md={12}>
                    <SANSelectList placeholder='Buscar disciplina' />
                </SANCol>
            </SANRow>
            <SANBox
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mt='xxl'
            >
                <PrevButton onClick={() => setCurrentTab('college')} />
                <NextButton onClick={() => setCurrentTab('theme')} />
            </SANBox>
        </SANBox>
    )
}

export default FLXFilterSubject
