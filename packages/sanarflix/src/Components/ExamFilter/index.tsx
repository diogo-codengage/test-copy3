import React from 'react'

import {
    SANTabs,
    SANTabPane,
    SANTypography,
    SANBox,
    SANButton,
    SANLayoutContainer,
    SANSessionTitle
} from '@sanar/components'

import { withFLXExamFilterProvider, useClassroomContext } from './Context'
import FLXFilterCollege from './College'
import FLXFilterSubject from './Subject'

interface IFLXExamFilterProps {}

export const NextButton = ({ onClick }) => (
    <SANButton
        variant='outlined'
        color='primary'
        size='small'
        uppercase
        bold
        onClick={onClick}
    >
        Próximo
    </SANButton>
)

export const PrevButton = ({ onClick }) => (
    <SANButton
        variant='outlined'
        color='default'
        size='small'
        uppercase
        bold
        onClick={onClick}
    >
        Voltar
    </SANButton>
)

const FLXExamFilter: React.FC<IFLXExamFilterProps> = () => {
    const { currentTab, setCurrentTab } = useClassroomContext()
    return (
        <SANBox pb={{ md: '8', _: '0' }} pt={{ md: '8', _: 'xxl' }}>
            <SANLayoutContainer fullMobile>
                <SANSessionTitle
                    title='Filtros avançados'
                    subtitle='Encontre outras provas utilizando os filtros avançados'
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
                            tab={
                                <SANTypography fontWeight='bold' fontSize='lg'>
                                    Faculdade
                                </SANTypography>
                            }
                            key='college'
                        >
                            <FLXFilterCollege />
                        </SANTabPane>
                        <SANTabPane
                            tab={
                                <SANTypography fontWeight='bold' fontSize='lg'>
                                    Disciplina
                                </SANTypography>
                            }
                            key='subject'
                        >
                            <FLXFilterSubject />
                        </SANTabPane>
                        <SANTabPane
                            tab={
                                <SANTypography fontWeight='bold' fontSize='lg'>
                                    Tema
                                </SANTypography>
                            }
                            key='theme'
                        ></SANTabPane>
                        <SANTabPane
                            tab={
                                <SANTypography fontWeight='bold' fontSize='lg'>
                                    Semestre
                                </SANTypography>
                            }
                            key='semester'
                        ></SANTabPane>
                    </SANTabs>
                    <SANBox
                        borderTop='1px solid'
                        borderColor='grey.1'
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
                        >
                            Buscar prova
                        </SANButton>
                    </SANBox>
                </SANBox>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withFLXExamFilterProvider(FLXExamFilter)
