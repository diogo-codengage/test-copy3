import { useEffect, useState } from 'react'

const useTryToCrash = () => {
    const [shouldCrash, setShouldCrash] = useState(false)

    const fn = async okToCrash => {
        if (okToCrash)
            setShouldCrash(() => {
                throw new Error(
                    typeof okToCrash !== 'boolean' ? okToCrash : 'Error'
                )
            })
    }

    useEffect(() => {
        fn(shouldCrash)
    }, [shouldCrash])

    return setShouldCrash
}

export default useTryToCrash
