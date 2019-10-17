import React from 'react'

import { useTranslation } from 'react-i18next'

import { withRouter } from 'react-router'
import { SANPage } from '@sanar/components'

import FLXAddedFilter from './Filter'
import FLXAddedList from './List'
import { FLXAddedProvider } from './Context'

const FLXAddedPage = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <FLXAddedProvider>
            <SANPage
                hasContainer
                BoxProps={{
                    bg: 'grey-solid.1',
                    pt: { _: 3, lg: 8 }
                }}
                HeaderProps={{
                    onBack: () => history.goBack(),
                    SessionTitleProps: {
                        title: t('added.title')
                    }
                }}
            >
                <FLXAddedFilter />
                <FLXAddedList />
            </SANPage>
        </FLXAddedProvider>
    )
}

export default withRouter(FLXAddedPage)
