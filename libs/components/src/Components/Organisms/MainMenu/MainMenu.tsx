import React, { useRef, forwardRef } from 'react'

import ESMainMenu from 'sanar-ui/dist/Components/Organisms/MainMenu'

type IProps = {
    onOpenOrClose: () => void
    showContinueBar?: boolean
}

const SANMainMenu: React.FC<IProps> = forwardRef(({ ...props }, ref) => {
    return <ESMainMenu ref={ref} {...props} />
})

SANMainMenu.defaultProps = {}

export default SANMainMenu
