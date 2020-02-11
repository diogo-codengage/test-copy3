import React from 'react'

import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import {
    SANTabs,
    SANTabPane,
    SANTypography,
    SANBox,
    SANButton,
    SANLayoutContainer
} from '@sanar/components'

import { withFLXExamFilterProvider, useClassroomContext } from './Context'
import FLXFilterCollege from './College'

interface IFLXExamFilterProps {}

const FLXExamFilter: React.FC<IFLXExamFilterProps> = ({}) => {
    const { currentTab, setCurrentTab } = useClassroomContext()
    return (
        <SANLayoutContainer px={{ md: 'md', _: 0 }}>
            <SANBox
                borderRadius={{ md: 'base', _: 0 }}
                border='1px solid'
                borderColor='grey.2'
                boxShadow='1'
                bg='white.10'
            >
                <SANTabs center activeKey={currentTab} onChange={setCurrentTab}>
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
                    ></SANTabPane>
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
    )
}

export default withFLXExamFilterProvider(FLXExamFilter)
