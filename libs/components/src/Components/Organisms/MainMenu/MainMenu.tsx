import React, { forwardRef } from 'react'

import ESMainMenu from 'sanar-ui/dist/Components/Organisms/MainMenu'

type Theme = 'dark' | 'light' | 'primary'

interface IProps {
    onOpenOrClose: () => void
    onHome: () => void
    showContinueBar?: boolean
    continueProps?: any
    theme?: Theme
}

const SANMainMenu: React.FC<IProps> = forwardRef(({ ...props }, ref) => {
    return <ESMainMenu ref={ref} {...props} />
})

export default SANMainMenu
