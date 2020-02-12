import React from 'react'

import {
    SANTypography,
    SANBox,
    SANRow,
    SANCol,
    SANSelectList
} from '@sanar/components'

import themeImg from 'Assets/images/exam-filter/subject-theme.svg'

import { useClassroomContext } from './Context'
import { NextButton, PrevButton } from './'

interface IFLXFilterThemeProps {}

const FLXFilterTheme: React.FC<IFLXFilterThemeProps> = () => {
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
                        Selecione os temas que mais correspondem com sua busca
                    </SANTypography>
                    <SANBox
                        as='img'
                        src={themeImg}
                        alt='Tema'
                        width='100%'
                        height={{ sm: 220, _: 124 } as any}
                        mb={{ xs: '0', _: 'md' }}
                    />
                </SANCol>
                <SANCol xs={24} sm={12} md={12}>
                    <SANSelectList
                        placeholder='Buscar tema'
                        onChange={console.log}
                        items={[{ value: '1', label: 'Tema 1' }]}
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
                <PrevButton onClick={() => setCurrentTab('subject')} />
                <NextButton onClick={() => setCurrentTab('semester')} />
            </SANBox>
        </SANBox>
    )
}

export default FLXFilterTheme
