import React, {
    useContext,
    useState,
    createContext,
    useRef,
    useEffect
} from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router'
import { useLastLocation } from 'react-router-last-location'
import { useApolloClient } from '@apollo/react-hooks'

import { SANClassroomMenuHeader } from '@sanar/components'

import { useMainContext } from 'Pages/Private/Context'

import {
    GET_SUGGESTED_CLASS,
    ISuggestedClassQuery,
    IAppointment
} from 'Apollo/Schedule/Queries/suggested-class'

type IMenuContext = 'general' | 'classroom'

interface IMenuState {
    indexMenu: number
    menuTitle: string | React.ReactNode
    darkMode?: boolean
    menuContext?: IMenuContext
}

type IRMLayoutProviderValue = {
    currentMenuIndex: number
    currentMenuTitle: string | React.ReactNode
    setMenuTab: (index: number) => void
    onCloseMenu: () => void
    onOpenMenu: () => void
    menuRef: any
    darkMode?: boolean
    menuContext?: IMenuContext
    navigations: INagivations
    setNavigations: React.Dispatch<React.SetStateAction<INagivations>>
    params: IParams
    setParams: React.Dispatch<React.SetStateAction<IParams>>
    footerProps: Object
    setFooterProps: React.Dispatch<React.SetStateAction<Object>>
    suggestedClass: ISuggestedClass
    fetchSuggestedClass: () => void
}

interface ISuggestedClass {
    loading: boolean
    error: boolean
    data?: IAppointment
}

const defaultNavigations: INagivations = {
    next: {},
    previous: {}
}

const defaultParams: IParams = {
    specialtyId: '',
    subspecialtyId: '',
    lessonId: '',
    collectionId: '',
    type: 'video',
    contentId: '',
    status: 'avaliacao'
}

const Context = createContext<IRMLayoutProviderValue>(
    {} as IRMLayoutProviderValue
)
export const useLayoutContext = () => useContext(Context)

interface IAction {
    children?: string
    onClick?: () => void
    disabled?: boolean
}

interface INagivations {
    next: IAction
    previous: IAction
}

interface IParams {
    specialtyId: string
    subspecialtyId: string
    lessonId: string
    collectionId: string
    type: 'video' | 'quiz'
    status: 'avaliacao' | 'feedback'
    contentId: string
}

const hasClassroom = window.location.href.includes('sala-aula')

const defaultMenuState: IMenuState = {
    indexMenu: 0,
    menuTitle: 'Menu',
    darkMode: hasClassroom,
    menuContext: hasClassroom ? 'classroom' : 'general'
}

const RMLayoutProvider: React.FC<RouteComponentProps> = ({
    children,
    history
}) => {
    const hasClassroom = window.location.href.includes('sala-aula')
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const lastLocation = useLastLocation()
    const [footerProps, setFooterProps] = useState({})
    const [suggestedClass, setSuggestedClass] = useState<ISuggestedClass>({
        loading: false,
        error: false
    })

    const [params, setParams] = useState<IParams>(defaultParams)
    const [menuState, setMenuState] = useState<IMenuState>({
        ...defaultMenuState,
        darkMode: hasClassroom,
        menuContext: hasClassroom ? 'classroom' : 'general',
        menuTitle: t('mainMenu.initial.title')
    })
    const [navigations, setNavigations] = useState<INagivations>(
        defaultNavigations
    )
    const menuRef = useRef<any>()
    const { handleTrack } = useMainContext()

    const onCloseMenu = () => {
        menuRef && menuRef.current && menuRef.current.setToggle(false)
    }

    const onOpenMenu = () => {
        menuRef && menuRef.current && menuRef.current.setToggle(true)
    }

    const handleBackClassroom = () => {
        handleTrack('Voltar button clicked')
        if (!lastLocation) {
            history.push(`/inicio/curso`)
        } else if (!lastLocation.pathname.includes('sala-aula')) {
            history.push(lastLocation.pathname)
        }
    }

    const setMenuTab = index => {
        switch (index) {
            case 0:
                setMenuState({
                    indexMenu: index,
                    menuTitle: t('mainMenu.initial.title'),
                    darkMode: false,
                    menuContext: 'general'
                })
                break
            case 1:
                setMenuState({
                    indexMenu: index,
                    menuTitle: t('mainMenu.account.title'),
                    darkMode: false,
                    menuContext: 'general'
                })
                break
            case 2:
                setMenuState({
                    indexMenu: index,
                    menuTitle: (
                        <SANClassroomMenuHeader
                            onBack={handleBackClassroom}
                            onClose={onCloseMenu}
                        />
                    ),
                    darkMode: true,
                    menuContext: 'classroom'
                })
                break
            default:
                setMenuState(defaultMenuState)
        }
    }

    const fetchSuggestedClass = async () => {
        try {
            setSuggestedClass(old => ({ ...old, loading: true }))
            const {
                data: { suggestedClass }
            } = await client.query<ISuggestedClassQuery>({
                query: GET_SUGGESTED_CLASS,
                fetchPolicy: 'network-only'
            })

            setSuggestedClass({
                data: suggestedClass,
                error: false,
                loading: false
            })
        } catch (e) {
            setSuggestedClass({ error: true, loading: false })
        }
    }

    useEffect(() => {
        fetchSuggestedClass()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        currentMenuIndex: menuState.indexMenu,
        currentMenuTitle: menuState.menuTitle,
        darkMode: menuState.darkMode,
        menuContext: menuState.menuContext,
        setMenuTab,
        menuRef,
        onCloseMenu,
        onOpenMenu,
        navigations,
        setNavigations,
        params,
        setParams,
        footerProps,
        setFooterProps,
        suggestedClass,
        fetchSuggestedClass
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default withRouter(RMLayoutProvider)
