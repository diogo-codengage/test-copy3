import { useEffect, useCallback } from 'react'

const events = ['mousedown', 'touchstart']

const useOnClickOutside = (refs = [], handler, inputs = []) => {
    if (!handler || typeof handler !== 'function') {
        throw new Error('[useOnClickOutside]: handler should be a function')
    }

    const refHandle = useCallback(handler, inputs)

    useEffect(() => {
        const listener = event => {
            if (!Array.isArray(refs)) {
                refs = [refs]
            }

            if (
                refs.find(
                    ref =>
                        !ref.current ||
                        ref.current.contains(event.target) ||
                        event.button !== 0
                )
            ) {
                return
            }

            refHandle(event)
        }

        events.forEach(event => {
            document.addEventListener(event, listener)
        })

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, listener)
            })
        }
    }, [refHandle])
}

export default useOnClickOutside
