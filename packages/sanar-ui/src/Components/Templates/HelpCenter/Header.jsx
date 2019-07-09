import React from 'react'

import ESTypography from '../../Atoms/Typography'
import ESSessionTitle from '../../Molecules/SessionTitle'
import ESInputSearch from '../../Atoms/Input/InputSearch'
import { useTranslation } from 'react-i18next'


const SANHelpHeader = (props) => {
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
                        <div className='d-flex align-items-center'>
                            <ESInputSearch
                                onClick={(e)=>{props.getSearchData(e.target.value)}}
                                onChange={(e)=>{props.getSearchData(e.target.value)}}
                                placeholder={props.placeholder}
                                enterButton={''}
                            />
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export default SANHelpHeader
