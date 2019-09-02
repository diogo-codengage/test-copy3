import React, { useEffect, useState } from 'react'
import { SANClassroomMenu } from '@sanar/components'
import { GET_THEMES } from 'Apollo/Classroom/Queries/themes'
import { useApolloClient } from '@apollo/react-hooks'
import {
    GET_THEME_CONTENTS,
    ITheme
} from 'Apollo/Classroom/Queries/themeContents'
import { withRouter, RouterProps } from 'react-router'
import { useLayoutContext } from '../Context'

const types = {
    Video: 'video',
    Document: 'documento',
    Question: 'questao'
}

const defaultCourse = {
    name: null,
    knowledge_area: null,
    progress_percentage: 0
}

const FLXClassroomMenu: React.FC<RouterProps> = ({ history }) => {
    const client = useApolloClient()
    const { onCloseMenu } = useLayoutContext()

    const [themeContents, setThemeContents] = useState()
    const [themes, setThemes] = useState()
    const [loadingContents, setLoadingContents] = useState(false)
    const [loadingThemes, setLoadingThemes] = useState(false)
    const [currentCourse, setCurrentCourse] = useState(defaultCourse)
    const [theme, setTheme] = useState({
        id: window.location.hash.split('/')[4]
    })

    const courseId = window.location.hash.split('/')[3]

    const loadThemes = async () => {
        setLoadingThemes(true)

        try {
            const {
                data: {
                    themes: { data: themes }
                }
            } = await client.query({
                query: GET_THEMES,
                fetchPolicy: 'network-only',
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
        } catch (e) {
            throw e
        }

        setLoadingContents(false)
    }

    const onSelect = async item => {
        getThemeContents(item)
    }

    useEffect(() => {
        loadThemes()
        getThemeContents(theme)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const goToResource = (item: ITheme) => {
        history.push(
            `/portal/sala-aula/${courseId}/${theme.id}/${
                types[item.resource_type]
            }/${item.resource_id}`
        )

        onCloseMenu()
    }

    return (
        <SANClassroomMenu
            course={{
                ...(currentCourse && {
                    knowledgeArea: currentCourse.knowledge_area,
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
                currentIndex:
                    (themeContents &&
                        themeContents.findIndex(item => !item.completed)[0]) ||
                    0,
                goToResource
            }}
        />
    )
}

export default withRouter(FLXClassroomMenu)
