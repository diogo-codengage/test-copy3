import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { SANPage } from '@sanar/components'

const FLXMyData = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: '8'
            }}
            HeaderProps={{
                onBack: () => history.goBack(),
                SessionTitleProps: {
                    title: 'Meus Dados'
                }
            }}
        >
            children
        </SANPage>
    )
}

export default withRouter(FLXMyData)
