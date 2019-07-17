import React, { useEffect } from 'react'

import ESHelpCenter from 'sanar-ui/dist/Components/Pages/HelpCenter'

const SANHelpCenter = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <ESHelpCenter />
}

export default SANHelpCenter
