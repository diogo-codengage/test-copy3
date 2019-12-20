import React, { useEffect, useMemo, useReducer } from 'react'

import { GET_THEMES } from 'Apollo/Classroom/Queries/themes'
import { GET_THEME } from 'Apollo/Classroom/Queries/theme'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import {
    GET_THEME_CONTENTS,
    ITheme
} from 'Apollo/Classroom/Queries/themeContents'
import { withRouter, RouteComponentProps } from 'react-router'
import { useLayoutContext } from '../Context'
import { useTranslation } from 'react-i18next'

import { SANClassroomMenu, SANEvaIcon, SANIcon } from '@sanar/components'
import { useTryToCrash } from '@sanar/utils/dist/Hooks'

// Playlist item image
import { FlowChartSVG, MentalmapSVG } from 'Assets/images/playlist'

const types = {
    Video: 'video',
    Document: 'documento',
    Quiz: 'questoes'
}

const initialState = {
    themes: [],
    totalThemes: 0,
    fetchingContents: false,
    themeContents: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateTheme':
            return {
                ...state,
                theme: action.payload
            }
        case 'fetchingContents':
            return {
                ...state,
                fetchingContents: action.payload
            }
        case 'updateThemeContents':
            return {
                ...state,
                theme: action.payload.theme,
                themeContents: action.payload.themeContents
            }
        case 'updateThemes':
            return {
                ...state,
                theme: action.payload.themes.find(
                    item => item.id === state.theme.id
                ),
                themes: action.payload.themes,
                currentCourse: action.payload.currentCourse,
                totalThemes: action.payload.totalThemes
            }
        default:
            return state
    }
}

const FLXClassroomMenu: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const setCrash = useTryToCrash()
    const { urlParams, onCloseMenu, setNavigations } = useLayoutContext()
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        currentCourse: {
            id: urlParams.courseId,
            name: null,
            knowledge_area: null,
            progress_percentage: 0
        },
        theme: {
            id: urlParams.themeId,
            index: 1
        }
    })

    const { data } = useQuery(GET_THEME, {
        variables: {
            id: state.theme.id,
            courseId: urlParams.courseId
        },
        skip: !state.theme.id || !urlParams.courseId
    })

    const configureThemeContentsIcon = (resourceType, type) => {
        switch (resourceType) {
            case 'Video':
                return <SANEvaIcon name='play-circle-outline' />
            case 'Quiz':
                return <SANEvaIcon name='edit-outline' />
            case 'Document':
                switch (type) {
                    case 'flowchart':
                        return <FlowChartSVG />
                    case 'mentalmap':
                        return <MentalmapSVG />
                    case 'question':
                        return <SANEvaIcon name='edit-outline' />
                    default:
                        return <SANEvaIcon name='file-text-outline' />
                }
            default:
                return <SANEvaIcon name='file-text-outline' />
        }
    }

    const getThemeContents = async (nextTheme, doRedirect = false) => {
        dispatch({ type: 'fetchingContents', payload: true })

        try {
            const {
                data: { themeContents }
            } = await client.query({
                query: GET_THEME_CONTENTS,
                variables: { themeId: nextTheme.id, courseId: urlParams.courseId }
            })

            const themeContentsIcons = (themeContents.data || []).map(item => ({
                ...item,
                hasType: true,
                icon: (
                    <SANIcon
                        component={() =>
                            configureThemeContentsIcon(
                                item.resource_type,
                                item.type
                            )
                        }
                    />
                )
            }))

            dispatch({
                type: 'updateThemeContents',
                payload: {
                    theme: state.themes.find(item => {
                        return item.id === nextTheme.id
                    }),
                    themeContents: themeContentsIcons,
                    fetchingContents: false
                }
            })

            if (doRedirect) {
                const incomplete =
                    themeContents.data.find(item => !item.completed) ||
                    themeContents.data[0]

                goToResource(incomplete, nextTheme.id, false)
            }
        } catch (error) {
            setCrash(error)
        }

        dispatch({ type: 'fetchingContents', payload: false })
    }

    const onSelect = async item => {
        getThemeContents(item, true)
    }

    const currentResource = useMemo(() => {
        if (!!state.themeContents.length) {
            const index = state.themeContents.findIndex(
                item => item.resource_id === urlParams.resourceId
            )
            return index >= 0 ? index : 0
        } else {
            return 0
        }
    }, [state.themeContents, urlParams.resourceId])

    const makeAction = resource =>
        !!resource
            ? {
                  children: resource.title,
                  onClick: () => goToResource(resource),
                  disabled: false
              }
            : {
                  disabled: true
              }

    const goToResource = (
        item: ITheme,
        themeId = state.theme.id,
        hasClose = true
    ) => {
        history.push(
            `/portal/sala-aula/${urlParams.courseId}/${themeId}/${
                types[item.resource_type]
            }/${item.resource_id}`
        )

        hasClose && onCloseMenu()
    }

    useEffect(() => {
        if (state.themeContents.length) {
            const previous = makeAction(
                state.themeContents[currentResource - 1]
            )
            const next = makeAction(state.themeContents[currentResource + 1])
            setNavigations({
                previous,
                next
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.themeContents, currentResource])

    useEffect(() => {
        !!state.themes.length && getThemeContents(state.theme)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.themes])

    useEffect(() => {
        !!state.themes.length &&
            urlParams.themeId &&
            getThemeContents({ id: urlParams.themeId })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams.themeId])

    useEffect(() => {
        dispatch({
            type: 'updateTheme',
            payload: {
                id: urlParams.themeId,
                index: 1
            }
        })
        const loadThemes = async courseId => {
            dispatch({ type: 'fetchingContents', payload: true })

            try {
                const {
                    data: {
                        themes: { data: themes, count: totalThemes }
                    }
                } = await client.query({
                    query: GET_THEMES,
                    variables: { courseIds: [courseId] }
                })

                dispatch({
                    type: 'updateThemes',
                    payload: {
                        themes,
                        currentCourse: themes[0].course,
                        totalThemes,
                        fetchingContents: false
                    }
                })
            } catch (error) {
                setCrash(error)
            }

            dispatch({ type: 'fetchingContents', payload: false })
        }
        loadThemes(urlParams.courseId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANClassroomMenu
            currentThemeIndex={(state.theme && state.theme.index) + 1}
            totalThemes={state.totalThemes}
            course={{
                ...(state.currentCourse && {
                    knowledgeArea: t('global.course'),
                    name: state.currentCourse.name,
                    progress: Math.round(
                        data && data.theme && data.theme.course
                            ? data.theme.course.progress_percentage
                            : 0
                    )
                })
            }}
            DisciplineDropdownProps={{
                onSelect,
                activeItem: state.theme,
                items: state.themes.map(item => {
                    return {
                        ...item,
                        progress: {
                            total: 2,
                            done:
                                item.progress_percentage === 0
                                    ? 0
                                    : item.progress_percentage < 100
                                    ? 1
                                    : 2
                        }
                    }
                }),
                loading: state.fetchingContents,
                progress: Math.round(
                    data && data.theme ? data.theme.progress_percentage : 0
                )
            }}
            PlaylistProps={{
                items: state.themeContents,
                loading: state.fetchingContents,
                currentIndex: currentResource,
                goToResource
            }}
        />
    )
}

export default withRouter(FLXClassroomMenu)
