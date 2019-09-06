import React, { useEffect, useState, useMemo } from 'react'
import { SANClassroomMenu } from '@sanar/components'
import { GET_THEMES } from 'Apollo/Classroom/Queries/themes'
import { useApolloClient } from '@apollo/react-hooks'
import {
    GET_THEME_CONTENTS,
    ITheme
} from 'Apollo/Classroom/Queries/themeContents'
import { withRouter, RouteComponentProps } from 'react-router'
import { useLayoutContext } from '../Context'
import { useTranslation } from 'react-i18next'

const types = {
    Video: 'video',
    Document: 'documento',
    Quiz: 'questoes'
}

const defaultCourse = {
    name: null,
    knowledge_area: null,
    progress_percentage: 0
}

const FLXClassroomMenu: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const { onCloseMenu, setNavigations } = useLayoutContext()

    const [themeContents, setThemeContents] = useState<ITheme[]>([])
    const [themes, setThemes] = useState<any[]>([])
    const [loadingContents, setLoadingContents] = useState(false)
    const [loadingThemes, setLoadingThemes] = useState(false)
    const [currentCourse, setCurrentCourse] = useState(defaultCourse)
    const [theme, setTheme] = useState({
        id: window.location.hash.split('/')[4]
    })

    const courseId = window.location.hash.split('/')[3]
    const resourceId = window.location.hash.split('/')[6]

    const loadThemes = async courseId => {
        setLoadingThemes(true)

        try {
            const {
                data: {
                    themes: { data: themes }
                }
            } = await client.query({
                query: GET_THEMES,
                variables: { courseId }
            })

            setCurrentCourse(themes[0].course)
            setThemes(themes)
            setTheme(themes.find(item => item.id === theme.id))
        } catch (e) {
            throw e
        }

        setLoadingThemes(false)
    }

    const getThemeContents = async theme => {
        try {
            setTheme(theme)
            setLoadingContents(true)

            const { data } = await client.query({
                query: GET_THEME_CONTENTS,
                variables: { themeId: theme.id }
            })

            setThemeContents(data.themeContents.data)
            const incomplete = data.themeContents.data.find(
                item => !item.completed
            )
            !!incomplete && goToResource(incomplete, theme.id, false)
        } catch (e) {
            throw e
        }

        setLoadingContents(false)
    }

    const onSelect = async item => {
        configureNewTheme(item)
    }

    const configureNewTheme = theme => {
        if (!!themes.length && theme.id) {
            const newTheme = themes.find(item => item.id === theme.id)
            getThemeContents(newTheme)
        }
    }

    const currentResource = useMemo(() => {
        if (!!themeContents.length) {
            const index = themeContents.findIndex(
                item => item.resource_id === resourceId
            )
            return index >= 0 ? index : 0
        } else {
            return 0
        }
    }, [themeContents, resourceId])

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
        themeId = theme.id,
        hasClose = true
    ) => {
        history.push(
            `/portal/sala-aula/${courseId}/${themeId}/${
                types[item.resource_type]
            }/${item.resource_id}`
        )

        hasClose && onCloseMenu()
    }

    useEffect(() => {
        loadThemes(courseId)
        getThemeContents(theme)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (themeContents.length) {
            const previous = makeAction(themeContents[currentResource - 1])
            const next = makeAction(themeContents[currentResource + 1])
            setNavigations({
                previous,
                next
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeContents, currentResource])

    useEffect(() => {
        return () => {
            configureNewTheme({ id: window.location.hash.split('/')[4] })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.hash.split('/')[4]])

    return (
        <SANClassroomMenu
            course={{
                ...(currentCourse && {
                    knowledgeArea: t('global.course'),
                    name: currentCourse.name,
                    progress: currentCourse.progress_percentage || 0
                })
            }}
            DisciplineDropdownProps={{
                onSelect,
                activeItem: theme,
                items: themes,
                loading: loadingThemes,
                progress: 50
            }}
            PlaylistProps={{
                items: themeContents,
                loading: loadingContents,
                currentIndex: currentResource,
                goToResource
            }}
        />
    )
}

export default withRouter(FLXClassroomMenu)
