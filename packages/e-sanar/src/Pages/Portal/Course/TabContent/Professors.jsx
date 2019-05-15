import React from 'react'
import SessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESCardAvatar from 'sanar-ui/dist/Components/Molecules/CardAvatar'

import { professors } from './mocks'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const linkedin = link => (
    <ESButton
        className='san-tab-course-content__professors--action'
        variant='outlined'
        size='xsmall'
        color='default'
        href={link}
    >
        <ESEvaIcon name='linkedin' />
    </ESButton>
)

const SANCourseProfessors = () => {
    return (
        <div className='san-tab-course-content__professors'>
            <SANPortalPagesContainer>
                <SessionTitle
                    title='Professores'
                    subtitle='Conheça os especialistas que vão te ajudar no seu aprendizado'
                />

                <ESRow gutter={24}>
                    {professors.map((professor, index) => {
                        return (
                            <ESCol
                                className='mb-md'
                                xs={24}
                                sm={12}
                                lg={6}
                                key={index}
                            >
                                <ESCardAvatar
                                    name={professor.name}
                                    formation={professor.titulation}
                                    image={professor.thumbnail}
                                    actions={linkedin(professor.resume)}
                                />
                            </ESCol>
                        )
                    })}
                </ESRow>
                <ESButton
                    uppercase
                    size='small'
                    color='primary'
                    variant='outlined'
                    className='mt-md san-tab-course-content__professors--load-more'
                >
                    Carregar mais
                </ESButton>
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANCourseProfessors
