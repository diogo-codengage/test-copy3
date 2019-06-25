import React, { createContext, useContext, useState, useEffect } from 'react'

const Context = createContext()

export const usePortalContext = () => useContext(Context)

export const SANPortalProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([])
    const [resourcesLoading, setResourcesLoading] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [currentModule, setCurrentModule] = useState(null)
    const [previousResource, setPreviousResource] = useState(null)
    const [currentResource, setCurrentResource] = useState(null)
    const [nextResource, setNextResource] = useState(null)
    const [indexMenu, setIndexMenu] = useState(0)

    const getResource = item => item[item.resource_type.toLowerCase()]

    useEffect(() => {
        if (currentResource && currentModule) {
            const {
                level_contents: { data: resources }
            } = currentModule

            const currentIndex = resources.findIndex(
                item => getResource(item).id === getResource(currentResource).id
            )

            setPreviousResource(resources[currentIndex - 1])
            setNextResource(resources[currentIndex + 1])
        }
    }, [currentResource, currentModule])

    const value = {
        playlist,
        setPlaylist,
        darkMode,
        setDarkMode,
        currentModule,
        setCurrentModule,
        resourcesLoading,
        setResourcesLoading,
        getResource,
        currentResource,
        setCurrentResource,
        previousResource,
        setPreviousResource,
        nextResource,
        setNextResource,
        indexMenu,
        setIndexMenu
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}
