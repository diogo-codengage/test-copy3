import React, { createContext, useContext, useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'

const Context = createContext()

export const usePortalContext = () => useContext(Context)

const PortalProvider = ({ children, history }) => {
    const [resourcesLoading, setResourcesLoading] = useState(false)

    const [currentModule, setCurrentModule] = useState(null)

    const [prevResource, setPrevResource] = useState(null)
    const [currentResource, setCurrentResource] = useState(null)
    const [nextResource, setNextResource] = useState(null)

    const getResource = item => item[item.resource_type.toLowerCase()]

    useEffect(() => {
        if (currentResource && currentModule) {
            const {
                level_contents: { data: resources }
            } = currentModule

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
    }, [currentResource, currentModule])

    const onNavigation = dir => () => {
        if (dir === 'prev' && prevResource) {
            setCurrentResource(prevResource)
            history.push(
                `/aluno/sala-aula/${
                    currentModule.id
                }/${prevResource.resource_type.toLowerCase()}/${
                    getResource(prevResource).id
                }`
            )
        } else if (nextResource) {
            setCurrentResource(nextResource)
            history.push(
                `/aluno/sala-aula/${
                    currentModule.id
                }/${nextResource.resource_type.toLowerCase()}/${
                    getResource(nextResource).id
                }`
            )
        }
    }

    const value = {
        currentModule,
        setCurrentModule,
        resourcesLoading,
        setResourcesLoading,
        getResource,
        currentResource,
        setCurrentResource,
        prevResource,
        setPrevResource,
        nextResource,
        setNextResource,
        onNavigation
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const SANPortalProvider = withRouter(PortalProvider)
