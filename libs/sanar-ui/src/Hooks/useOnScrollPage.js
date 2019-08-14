import { useEffect, useState } from 'react'

const useOnScrollPage = () => {
    const [state, setState] = useState({
        offsetX: window.pageXOffset || 0,
        offsetY: window.pageYOffset || 0
    })

    useEffect(() => {
        const handler = () => {
            console.log('here')
            setState({
                offsetX: window.pageXOffset,
                offsetY: window.pageYOffset
            })
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    return state
}

export default useOnScrollPage
