import React from 'react'
import SessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESCardAvatar from 'sanar-ui/dist/Components/Molecules/CardAvatar'

import { professors } from './mocks'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useAuthContext } from 'Hooks/auth'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

    const { getEnrollment } = useAuthContext()

    const { course: courseMock } = getEnrollment()

    const course = {
        ...courseMock
    }

    return (
        <div className='san-tab-course-content__professors'>
            <SANPortalPagesContainer>
                <SessionTitle
                    title={t('courseDetails.tabContent.professors.title')}
                    subtitle={t('courseDetails.tabContent.professors.subtitle')}
                />

                <ESRow gutter={24} type='flex' justify='space-around'>
                    {course.professors.map((professor, index) => {
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
                    {t('courseDetails.tabContent.professors.buttonLoadMore')}
                </ESButton>
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANCourseProfessors
