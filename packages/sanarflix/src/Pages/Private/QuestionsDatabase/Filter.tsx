import React, { useEffect, useState } from 'react'

import { theme } from 'styled-tools'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANLayoutContainer,
    SANSessionTitle,
    SANRow,
    SANCol,
    SANButton,
    SANCardSelectFilter,
    SANBox,
    SANStyled,
    SANPage
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

import { events } from 'Config/Segment'

import courseSvg from 'Assets/images/filters/course.svg'
import themeSvg from 'Assets/images/filters/theme.svg'

import { useQuestionsContext } from './Context'

const SANCardSelectFilterStyled = SANStyled(SANCardSelectFilter)`
    & {
        & .es-card-select-filter__content .badge,
        & .es-card-select-filter__footer--checked {
            background-color: ${theme('colors.primary-10')};
        }
    }
`

interface IFLXSelectsFilter {
    selectedCourses: ICourse[]
    setSelectedCourses: (courses: ICourse[]) => void
    selectedThemes: ITheme[]
    setSelectedThemes: (themes: ITheme[]) => void
    hasTitle?: boolean
}

export const FLXSelectsFilter = ({
    selectedCourses,
    setSelectedCourses,
    selectedThemes,
    setSelectedThemes,
    hasTitle
}: IFLXSelectsFilter) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const [courses, setCourses] = useState<ICourse[]>([])
    const [themes, setThemes] = useState<ITheme[]>([])
    const [loading, setLoading] = useState({
        courses: false,
        themes: false
    })

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(old => ({ ...old, courses: true }))

            let tempCourses = []

            try {
                let count;
                let again;
                do {
                    const resp = await client.query<ICourses>({
                        query: GET_COURSES,
                        variables: {
                            skip: tempCourses.length
                        }
                    })
                    tempCourses = tempCourses.concat(resp.data.courses.data as [])
                    count = resp.data.courses.count
                    again = count > tempCourses.length;
                } while (again);
            } catch(ex) {
               console.error({ex})
            }

            setCourses(tempCourses)
            setLoading(old => ({ ...old, courses: false }))
        }
        fetchCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!!selectedCourses.length) {
            const fetchThemes = async () => {
                setLoading(old => ({ ...old, themes: true }))
                try {
                    const { data }: { data: IThemes } = await client.query({
                        query: GET_THEMES,
                        variables: {
                            courseIds: selectedCourses.map(
                                selected => selected.value
                            )
                        }
                    })
                    setThemes(data.themes.data || [])
                } catch {}
                setLoading(old => ({ ...old, themes: false }))
            }
            fetchThemes()
        } else {
            setThemes([])
            setSelectedThemes([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCourses])

    return (
        <SANRow gutter={24}>
            {hasTitle && (
                <SANCol mb={7}>
                    <SANSessionTitle
                        title={t('questionsDatabase.filter.subheader')}
                    />
                </SANCol>
            )}
            <SANCol sm={24} md={12} mb='xl'>
                <SANCardSelectFilterStyled
                    loading={loading.courses}
                    labelSelecteds={t(
                        'questionsDatabase.filter.course.labelSelecteds'
                    )}
                    placeholder={t(
                        'questionsDatabase.filter.course.placeholder'
                    )}
                    filterName={t('questionsDatabase.filter.course.filterName')}
                    image={courseSvg}
                    items={courses}
                    value={selectedCourses}
                    onChange={setSelectedCourses}
                />
            </SANCol>
            <SANCol sm={24} md={12} mb='xl'>
                <SANCardSelectFilterStyled
                    loading={loading.themes}
                    labelSelecteds={t(
                        'questionsDatabase.filter.theme.labelSelecteds'
                    )}
                    placeholder={
                        !!selectedCourses.length
                            ? t('questionsDatabase.filter.theme.placeholder')
                            : t('questionsDatabase.filter.theme.selectCourses')
                    }
                    filterName={t('questionsDatabase.filter.theme.filterName')}
                    image={themeSvg}
                    items={themes}
                    value={selectedThemes}
                    onChange={setSelectedThemes}
                    disabled={!selectedCourses.length}
                />
            </SANCol>
        </SANRow>
    )
}

const FLXFilter = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const [selectedCourses, setSelectedCourses] = useState<ICourse[]>([])
    const [selectedThemes, setSelectedThemes] = useState<ITheme[]>([])
    const { reset, dispatch } = useQuestionsContext()

    const handleStart = () => {
        dispatch({
            type: 'filter',
            filter: {
                selectedCourses,
                selectedThemes
            }
        })
        history.push('/portal/banco-questoes/perguntas/pratica')
    }

    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { xs: '8', _: 'md' }
            }}
            HeaderProps={{
                onBack: () => history.push('/portal/inicio'),
                SessionTitleProps: {
                    title: t('questionsDatabase.filter.header.title'),
                    extra: (
                        <SANBox displayFlex flex='1'>
                            <SANButton
                                variant='solid'
                                color='primary'
                                uppercase
                                bold
                                size='small'
                                block
                                onClick={handleStart}
                            >
                                {t(
                                    'questionsDatabase.filter.header.actions.start'
                                )}
                            </SANButton>
                        </SANBox>
                    )
                }
            }}
        >
            <SANBox bg='grey-solid.1' flex='1'>
                <SANLayoutContainer>
                    <FLXSelectsFilter
                        setSelectedCourses={setSelectedCourses}
                        selectedCourses={selectedCourses}
                        setSelectedThemes={setSelectedThemes}
                        selectedThemes={selectedThemes}
                        hasTitle
                    />
                </SANLayoutContainer>
            </SANBox>
        </SANPage>
    )
}

export default withRouter(FLXFilter)
