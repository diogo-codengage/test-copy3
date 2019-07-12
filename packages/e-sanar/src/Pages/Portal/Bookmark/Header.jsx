import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ESInput from 'sanar-ui/dist/Components/Atoms/Input'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

const intlPath = 'bookmark.'

const SANBookmarksHeader = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='san-bookmark-page__header'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    title={
                        <ESTypography level={4}>
                            {t(`${intlPath}title`)}
                        </ESTypography>
                    }
                    subtitle={
                        <ESTypography variant='subtitle2'>
                            {t(`${intlPath}subtitle`)}
                        </ESTypography>
                    }
                    extra={
                        <ESInput
                            prefix={<ESEvaIcon name='search-outline' />}
                            placeholder={t(`${intlPath}search`)}
                        />
                    }
                />
            </SANPortalPagesContainer>
        </div>
    )
}

SANBookmarksHeader.propTypes = {}

export default SANBookmarksHeader
