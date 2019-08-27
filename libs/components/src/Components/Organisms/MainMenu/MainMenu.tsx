import React, { useRef, forwardRef } from 'react'

import ESMainMenu from 'sanar-ui/dist/Components/Organisms/MainMenu'

interface IProps {
    onOpenOrClose: () => void
    onHome: () => void
    showContinueBar?: boolean
}

const SANMainMenu: React.FC<IProps> = forwardRef(({ ...props }, ref) => {
    return <ESMainMenu ref={ref} {...props} />
})

export default SANMainMenu
