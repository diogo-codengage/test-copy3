import { useEffect, useState } from 'react'

export const isClient = typeof window === 'object'

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
    const [state, setState] = useState({
        width: isClient ? window.innerWidth : initialWidth,
        height: isClient ? window.innerHeight : initialHeight
    })

    useEffect(() => {
        if (isClient) {
            const handler = () =>
                setState({
                    width: window.innerWidth,
                    height: window.innerHeight
                })
            window.addEventListener('resize', handler)
            return () => window.removeEventListener('resize', handler)
        } else {
            return undefined
        }
    }, [])

    return state
}

export default useWindowSize
