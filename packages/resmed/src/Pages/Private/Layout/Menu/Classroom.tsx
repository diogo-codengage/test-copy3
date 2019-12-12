import React, { useState, useEffect, useMemo } from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router'

import { SANClassroomMenu, SANEvaIcon } from '@sanar/components'
import { useTryToCrash } from '@sanar/utils/dist/Hooks'

import { useMainContext } from 'Pages/Private/Context'
import { GET_LESSONS, ILessons } from 'Apollo/Classroom/Queries/lessons'
import { useAuthContext } from 'Hooks/auth'

import { useLayoutContext } from '../Context'

const RMClassroomMenu: React.FC<RouteComponentProps> = ({ history }) => {
    const client = useApolloClient()
    const { handleTrack } = useMainContext()
    const { activeCourse } = useAuthContext()
    const setCrash = useTryToCrash()
    const { params, onCloseMenu } = useLayoutContext()
    const [currentResource, setCurrentResource] = useState(0)
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<any[]>([])

    const setIndex = (id, arr) => {
        if (!!arr && !!arr.length) {
            const index = arr.findIndex(e => e.id === id)
            index !== currentResource && setCurrentResource(index)
        }
    }

    const goToLesson = item => {
        const {
            specialtyId,
            subSpecialtyId,
            lesson,
            collectionId,
            resource
        } = item.lastAccessed

        handleTrack('Lesson clicked', {
            'Specialty ID': specialtyId,
            'Subspecialty ID': subSpecialtyId,
            'Lesson ID': lesson.id,
            'Clicker ID': collectionId
        })

        setIndex(item.id, lessons)
        history.push(
            `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${
                lesson.id
            }/${collectionId}/${resource.type.toLocaleLowerCase()}/${
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
                        completed: lesson.completed,
                        extra: lesson.completed ? (
                            <SANEvaIcon
                                name='checkmark-circle-2'
                                color='warning'
                            />
                        ) : (
                            <SANEvaIcon
                                name='arrow-ios-forward-outline'
                                color='light'
                            />
                        )
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

    useEffect(() => {
        setIndex(params.lessonId, lessons)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.lessonId, lessons])

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
