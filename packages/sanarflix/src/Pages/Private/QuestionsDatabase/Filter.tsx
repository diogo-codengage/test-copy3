import React, { useEffect, useState } from 'react'

import { theme } from 'styled-tools'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANLayoutContainer,
    SANSessionTitle,
    SANHeader,
    SANRow,
    SANCol,
    SANButton,
    SANCardSelectFilter,
    SANBox,
    SANStyled
} from '@sanar/components'

import {
    GET_COURSES,
    ICourses,
    ICourse
} from 'Apollo/QuestionsDatabase/Queries/courses'
import {
    GET_THEMES,
    IThemes,
    ITheme
} from 'Apollo/QuestionsDatabase/Queries/themes'

import courseSvg from 'Assets/images/filters/course.svg'
import themeSvg from 'Assets/images/filters/theme.svg'

const SANCardSelectFilterStyled = SANStyled(SANCardSelectFilter)`
    & {
        & .es-card-select-filter__footer--checked {
            background-color: ${theme('colors.primary-10')};
        }
    }
`

const FLXFilter = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const [courses, setCouses] = useState<ICourse[]>([])
    const [selectedCourses, setSelectedCourses] = useState<ICourse[]>([])
    const [themes, setThemes] = useState<ITheme[]>([])
    const [selectedThemes, setSelectedThemes] = useState<ITheme[]>([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data }: { data: ICourses } = await client.query({
                    query: GET_COURSES
                })
                setCouses(data.courses.data)
            } catch {}
        }
        fetchCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!!selectedCourses.length) {
            const fetchThemes = async () => {
                try {
                    const { data }: { data: IThemes } = await client.query({
                        query: GET_THEMES,
                        variables: {
                            courseIds: selectedCourses.map(
                                selected => selected.value
                            )
                        }
                    })
                    setThemes(data.themes.data)
                } catch {}
            }
            fetchThemes()
        } else {
            setThemes([])
            setSelectedThemes([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCourses])

    return (
        <>
            <SANHeader
                onBack={() => history.goBack()}
                SessionTitleProps={{
                    title: t('questionsDatabase.filter.header.title'),
                    subtitle: t('questionsDatabase.filter.header.subtitle'),
                    extra: (
                        <SANBox displayFlex flex='1'>
                            <SANButton
                                variant='text'
                                uppercase
                                bold
                                size='small'
                                mr='xl'
                                block
                            >
                                {t(
                                    'questionsDatabase.filter.header.actions.historic'
                                )}
                            </SANButton>
                            <SANButton
                                variant='solid'
                                color='primary'
                                uppercase
                                bold
                                size='small'
                                block
                            >
                                {t(
                                    'questionsDatabase.filter.header.actions.start'
                                )}
                            </SANButton>
                        </SANBox>
                    )
                }}
            />
            <SANBox bg='grey-solid.1' flex='1'>
                <SANLayoutContainer mt={8}>
                    <SANRow gutter={24}>
                        <SANCol sm={0} md={24}>
                            <SANSessionTitle
                                title={t('questionsDatabase.filter.subheader')}
                            />
                        </SANCol>
                        <SANCol sm={24} md={12} mb='xl'>
                            <SANCardSelectFilterStyled
                                labelSelecteds={t(
                                    'questionsDatabase.filter.course.labelSelecteds'
                                )}
                                placeholder={t(
                                    'questionsDatabase.filter.course.placeholder'
                                )}
                                filterName={t(
                                    'questionsDatabase.filter.course.filterName'
                                )}
                                image={courseSvg}
                                items={courses}
                                value={selectedCourses}
                                onChange={setSelectedCourses}
                            />
                        </SANCol>
                        <SANCol sm={24} md={12} mb='xl'>
                            <SANCardSelectFilterStyled
                                labelSelecteds={t(
                                    'questionsDatabase.filter.theme.labelSelecteds'
                                )}
                                placeholder={
                                    !!selectedCourses.length
                                        ? t(
                                              'questionsDatabase.filter.theme.placeholder'
                                          )
                                        : t(
                                              'questionsDatabase.filter.theme.selectCourses'
                                          )
                                }
                                filterName={t(
                                    'questionsDatabase.filter.theme.filterName'
                                )}
                                image={themeSvg}
                                items={themes}
                                value={selectedThemes}
                                onChange={setSelectedThemes}
                                disabled={!selectedCourses.length}
                            />
                        </SANCol>
                    </SANRow>
                </SANLayoutContainer>
            </SANBox>
        </>
    )
}

export default withRouter(FLXFilter)
