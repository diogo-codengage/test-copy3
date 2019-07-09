import React, {useState} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESSessionTitle from '../../Molecules/SessionTitle'
import ESCollapse from '../../Atoms/Collapse'
import ESCollapsePanel from '../../Atoms/Collapse/CollapsePanel'
import SANHelpHeader from './Header'
import questionsData from './questionsData.json';
import { useTranslation } from 'react-i18next'
import { select, text, boolean } from '@storybook/addon-knobs'

const positionOptions = {
    Left: 'left',
    Right: 'right'
}

const ESHelpCenterTemplate = ({
    className,
    actionsMargin
}) => {
    const { t } = useTranslation('sanarui')
    let [helpCenterData, sethelpCenterData] = useState(questionsData);

    const classes = classNames('es-help-center-template', className)

    const classesInfo = classNames(
        'es-help-center-template__content__infos',
        className,
        {
            'es-help-center-template__content__infos--large-margin':
                actionsMargin === 'large'
        }
    )

    const getSearchData = (data) => {
        if(data === ''){
            sethelpCenterData(questionsData)
        } else{
            let dataFiltered = {}
            dataFiltered.plataforma = questionFilter(questionsData.plataforma, data);
            dataFiltered.cursos = questionFilter(questionsData.cursos, data);
            dataFiltered.cancelamento = questionFilter(questionsData.cancelamento, data);
            dataFiltered.outros = questionFilter(questionsData.outros, data);
            sethelpCenterData(dataFiltered)
        }
    }

    const questionFilter = (questionType, data) => {
        return questionType.filter(function (item) {
            return Object.values(item).map(function (value) {
              return String(value);
            }).find(function (value) {
                return value.includes(data);
            });
          });
    }

    return (
        <div className={classes}>
            <SANHelpHeader getSearchData={getSearchData}></SANHelpHeader>
            <div className='es-help-center-template__content'>
                <div className={classesInfo}>
                    <ESSessionTitle
                        title={text('Title', `${t('helpCenter.helpContent.0.title')}`)}
                        subtitle={text('Subtitle',`${t('helpCenter.helpContent.0.subTitle')}`)}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select('Expand Icon Position',positionOptions,'right')}
                    >
                        {helpCenterData.plataforma.map((plataforma, index) =>
                            <ESCollapsePanel key={plataforma.title} header={text('Header',`${plataforma.title}`)} customKey={`${index}`} >
                                <p>{plataforma.subtitle} </p>
                            </ESCollapsePanel>
                        )}
                    </ESCollapse>
                    <ESSessionTitle
                        title={text('Title', `${t('helpCenter.helpContent.1.title')}`)}
                        subtitle={text('Subtitle',`${t('helpCenter.helpContent.1.subTitle')}`)}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select('Expand Icon Position',positionOptions,'right')}
                    >
                      {helpCenterData.cursos.map((cursos, index) =>
                        <ESCollapsePanel key={cursos.title} header={text('Header',`${cursos.title}`)} customKey={`${index}`} >
                            <p>{cursos.subtitle} </p>
                        </ESCollapsePanel>
                    )}
                    </ESCollapse>
                    <ESSessionTitle
                        title={text('Title', `${t('helpCenter.helpContent.2.title')}`)}
                        subtitle={text('Subtitle',`${t('helpCenter.helpContent.2.subTitle')}`)}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select('Expand Icon Position',positionOptions,'right')}
                    >
                        {helpCenterData.cancelamento.map((cancelamento, index) =>
                        <ESCollapsePanel key={cancelamento.title} header={text('Header',`${cancelamento.title}`)} customKey={`${index}`} >
                            <p>{cancelamento.subtitle} </p>
                        </ESCollapsePanel>
                    )}
                    </ESCollapse>
                    <ESSessionTitle
                        title={text('Title', `${t('helpCenter.helpContent.3.title')}`)}
                        subtitle={text('Subtitle',`${t('helpCenter.helpContent.3.subTitle')}`)}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select('Expand Icon Position',positionOptions,'right')}
                    >
                        {helpCenterData.outros.map((outros, index) =>
                        <ESCollapsePanel key={outros.title} header={text('Header',`${outros.title}`)} customKey={`${index}`} >
                            <p>{outros.subtitle} </p>
                        </ESCollapsePanel>
                    )}
                    </ESCollapse>
                </div>
            </div>
        </div>
    )
}

ESHelpCenterTemplate.propTypes = {
    className: PropTypes.string,
    actionsMargin: PropTypes.oneOf(['default', 'large'])
}
ESHelpCenterTemplate.defaultProps = {
    actionsMargin: 'default'
}

export default ESHelpCenterTemplate
