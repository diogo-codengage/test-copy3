import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useReducer
} from 'react'

import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import { getClassRoute } from 'Utils/getClassRoute'
import { useApolloContext } from 'Hooks/apollo'
import { useAuthContext } from 'Hooks/auth'
import { GET_LAST_ACCESSED } from 'Apollo/Me/last-accessed'

const Context = createContext()

export const usePortalContext = () => useContext(Context)

const initialState = {
    loading: true,
    success: false,
    error: false,
    currentModule: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return { ...state, loading: true }
        case 'success':
            return { ...state, loading: false, currentModule: action.payload }
        case 'error':
            return { ...state, loading: false, error: action.payload || true }
        default:
            throw new Error()
    }
}

const PortalProvider = ({ children, history }) => {
    const client = useApolloContext()
    const { t } = useTranslation('esanar')
    const { getEnrollment } = useAuthContext()
    const [prevResource, setPrevResource] = useState(null)
    const [currentResource, setCurrentResource] = useState(null)
    const [nextResource, setNextResource] = useState(null)
    const [lastAccessed, setLastAccessed] = useState(null)

    const [state, dispatch] = useReducer(reducer, initialState)

    const { id: enrollmentId } = getEnrollment()

    const getResource = item => item[item.resource_type.toLowerCase()]

    const onNavigation = dir => () => {
        if (dir === 'prev' && prevResource) {
            setCurrentResource(prevResource)
            goClassroom(prevResource)
        } else if (nextResource) {
            setCurrentResource(nextResource)
            goClassroom(nextResource)
        }
    }

    const goClassroom = resource => {
        const type = getClassRoute(resource.resource_type)
        const resourceId = getResource(resource).id
        history.push(
            `/aluno/sala-aula/${state.currentModule.id}/${type}/${resourceId}`
        )
    }

    const fetchLastAccessed = async () => {
        try {
            const {
                data: { lastAccessed }
            } = await client.query({
                query: GET_LAST_ACCESSED,
                fetchPolicy: 'network-only',
                variables: {
                    enrollmentId
                }
            })
            setLastAccessed(lastAccessed)
        } catch (error) {
            console.error(error)
            message.error(t('global.failLoadLastAccessed'))
        }
    }

    useEffect(() => {
        fetchLastAccessed()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enrollmentId])

    useEffect(() => {
        if (currentResource && state.currentModule) {
            const {
                level_contents: { data: resources }
            } = state.currentModule

            const currentIndex = resources.findIndex(
                item => getResource(item).id === getResource(currentResource).id
            )

            const prev = resources[currentIndex - 1]
            const next = resources[currentIndex + 1]

            prev
                ? setPrevResource({
                      ...prev,
                      title: getResource(prev).title
                  })
                : setPrevResource()
            next
                ? setNextResource({
                      ...next,
                      title: getResource(next).title
                  })
                : setNextResource()
        }
    }, [currentResource, state.currentModule])

    const value = {
        getResource,
        currentResource,
        setCurrentResource,
        prevResource,
        setPrevResource,
        nextResource,
        setNextResource,
        onNavigation,
        state,
        dispatch,
        lastAccessed,
        fetchLastAccessed
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANPortalProvider = withRouter(PortalProvider)
