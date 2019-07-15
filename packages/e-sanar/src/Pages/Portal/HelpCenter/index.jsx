import React, { useEffect } from 'react'

import ESHelpCenter from 'sanar-ui/dist/Components/Pages/HelpCenter'

const SANHelpCenter = () => {
    useEffect(() => {
        const scroll = document.getElementById('san-scroll')
        scroll.firstChild.scrollTo(0, 0)
    }, [])

    return <ESHelpCenter />
}

export default SANHelpCenter
