import React, { useState } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import ESSessionTitle from '../../Molecules/SessionTitle'
import ESCollapse from '../../Atoms/Collapse'
import ESCollapsePanel from '../../Atoms/Collapse/CollapsePanel'

import HelpHeader from './Header'
import questionsData from './questionsData.json'

const ESHelpCenter = ({ className }) => {
    const { t } = useTranslation('sanarui')
    const [helpCenterData, sethelpCenterData] = useState(questionsData)
    const classes = classNames(className, 'es-help-center-template')

    const scroll = document.getElementById('san-scroll')
    if(scroll) {scroll.firstChild.scrollTo(0, 0)}

    const getSearchData = data => {
        if (data === '') {
            sethelpCenterData(questionsData)
        } else {
            let dataFiltered = {}
            dataFiltered.plataforma = questionFilter(
                questionsData.plataforma,
                data
            )
            dataFiltered.cursos = questionFilter(questionsData.cursos, data)
            dataFiltered.cancelamento = questionFilter(
                questionsData.cancelamento,
                data
            )
            dataFiltered.outros = questionFilter(questionsData.outros, data)
            sethelpCenterData(dataFiltered)
        }
    }

    const questionFilter = (questionType, data) => {
        return questionType.filter(function(item) {
            return Object.values(item)
                .map(function(value) {
                    return String(value)
                })
                .find(function(value) {
                    return value.toLowerCase().includes(data.toLowerCase())
                })
        })
    }

    const renderItem = (item, index) => (
        <ESCollapsePanel
            key={item.title}
            header={item.title}
            customKey={`${index}`}
        >
            <p>{item.subtitle} </p>
        </ESCollapsePanel>
    )

    return (
        <div className={classes}>
            <HelpHeader getSearchData={getSearchData} />
            <div className='es-help-center-template__content'>
                <div className='es-help-center-template__content__infos'>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.0.title')}
                        subtitle={t('helpCenter.helpContent.0.subTitle')}
                    />
                    <ESCollapse className='mb-xxl'>
                        {helpCenterData.plataforma.map(renderItem)}
                    </ESCollapse>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.1.title')}
                        subtitle={t('helpCenter.helpContent.1.subTitle')}
                    />
                    <ESCollapse className='mb-xxl'>
                        {helpCenterData.cursos.map(renderItem)}
                    </ESCollapse>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.2.title')}
                        subtitle={t('helpCenter.helpContent.2.subTitle')}
                    />
                    <ESCollapse className='mb-xxl'>
                        {helpCenterData.cancelamento.map(renderItem)}
                    </ESCollapse>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.3.title')}
                        subtitle={t('helpCenter.helpContent.3.subTitle')}
                    />
                    <ESCollapse className='mb-xxl'>
                        {helpCenterData.outros.map(renderItem)}
                    </ESCollapse>
                </div>
            </div>
        </div>
    )
}

ESHelpCenter.propTypes = {
    className: PropTypes.string
}
ESHelpCenter.defaultProps = {}

export default ESHelpCenter
