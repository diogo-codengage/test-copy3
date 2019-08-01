import React from 'react'
import { useTranslation } from 'react-i18next'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

const intlPath = 'bookmark.'

const SANBookmarksHeader = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='header'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    title={
                        <ESTypography className='header__title' level={4}>
                            {t(`${intlPath}title`)}
                        </ESTypography>
                    }
                    subtitle={
                        <ESTypography
                            className='header__subtitle'
                            ellipsis
                            variant='subtitle2'
                        >
                            {t(`${intlPath}subtitle`)}
                        </ESTypography>
                    }
                />
            </SANPortalPagesContainer>
        </div>
    )
}

SANBookmarksHeader.propTypes = {}

export default SANBookmarksHeader
