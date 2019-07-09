import React from 'react'

import { useTranslation } from 'react-i18next'

import ESTypography from '../../Atoms/Typography'
import ESSessionTitle from '../../Molecules/SessionTitle'
import ESInputSearch from '../../Atoms/Input/InputSearch'

const HelpHeader = ({ getSearchData }) => {
    const { t } = useTranslation('sanarui')

    return (
        <div className='es-help-center-template__header'>
            <div className='es-help-center-template__container'>
                <ESSessionTitle
                    title={
                        <ESTypography level={4}>
                            {t('helpCenter.header.title')}
                        </ESTypography>
                    }
                    subtitle={t('helpCenter.header.subTitle')}
                    extra={
                        <ESInputSearch
                            onChange={e => getSearchData(e.target.value)}
                            placeholder={t('helpCenter.header.placeholder')}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default HelpHeader
