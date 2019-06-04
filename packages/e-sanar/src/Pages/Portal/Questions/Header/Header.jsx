import React from 'react'

import { PageHeader as ANTPageHeader } from 'antd'
import { SANPortalPagesContainer } from '../../Layout'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import ESAlternative from 'sanar-ui/dist/Components/Atoms/Alternative'

const ESQuestionHeader = ({ title, extra }) => {
    const { t } = useTranslation()

    return (
        <ANTPageHeader className='header'>
            <SANPortalPagesContainer>
                <ESRow
                    className='header__container'
                    type='flex'
                    align='middle'
                    gutter={20}
                >
                    <ESCol span={12} className='header__container--left'>
                        {title}
                    </ESCol>
                    <ESCol span={12} className='header__container--right'>
                        {extra}
                    </ESCol>
                </ESRow>
                {/* <ESAlternative
                    situation='correct'
                    answer='A'
                    value='aushauhuehaueh'
                /> */}
            </SANPortalPagesContainer>
        </ANTPageHeader>
    )
}

ESQuestionHeader.propTypes = {
    title: PropTypes.element,
    extra: PropTypes.element
}

export default ESQuestionHeader
