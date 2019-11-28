import React, { useState, useEffect, useMemo } from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router'

import { SANClassroomMenu } from '@sanar/components'
import { useTryToCrash } from '@sanar/utils/dist/Hooks'

import { GET_LESSONS, ILessons } from 'Apollo/Classroom/Queries/lessons'
import { useAuthContext } from 'Hooks/auth'

import { useLayoutContext } from '../Context'

const RMClassroomMenu: React.FC<RouteComponentProps> = ({ history }) => {
    const client = useApolloClient()
    const { activeCourse } = useAuthContext()
    const setCrash = useTryToCrash()
    const { params, onCloseMenu } = useLayoutContext()
    const [currentResource, setCurrentResource] = useState(0)
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<any[]>([])

    const goToLesson = item => {
        const {
            specialtyId,
            subSpecialtyId,
            lessonId,
            collectionId,
            resource
        } = item.lastAccessed

        const index = lessons.findIndex(lesson => lesson.id === item.id)
        index !== currentResource && setCurrentResource(index)
        history.push(
            `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${lessonId}/${collectionId}/${resource.type.toLocaleLowerCase()}/${
                resource.id
            }`
        )
        onCloseMenu()
    }

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true)
            try {
                const {
                    data: { lessons }
                } = await client.query<ILessons>({
                    query: GET_LESSONS,
                    variables: {
                        parentId: params.subspecialtyId || params.specialtyId
                    }
                })
                setLessons(
                    lessons.map(lesson => ({
                        ...lesson,
                        hasType: false,
                        completed: false
                    }))
                )
            } catch {
                setCrash()
            }
            setLoading(false)
        }
        fetchLessons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    const specialtyName = useMemo(() => {
        if (!!lessons.length) {
            const lesson = lessons[currentResource]
            if (lesson.subSpecialty && lesson.subSpecialty.specialty) {
                return lesson.subSpecialty.specialty.name
            }
        }
    }, [lessons, currentResource])

    return (
        <SANClassroomMenu
            course={{
                knowledgeArea: specialtyName,
                name: activeCourse.name,
                progress: activeCourse.progress
            }}
            PlaylistProps={{
                items: lessons,
                loading,
                currentIndex: currentResource,
                goToResource: goToLesson
            }}
        />
    )
}

export default withRouter(RMClassroomMenu)
