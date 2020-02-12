import React from 'react'

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
                        Escolha as disciplinas que deseja se aprofundar
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
                        placeholder='Buscar disciplina'
                        onChange={console.log}
                        items={[{ value: '1', label: 'Disciplina 1' }]}
                        value={[]}
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
