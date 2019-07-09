import React, {useState} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESSessionTitle from '../../Molecules/SessionTitle'
import ESCollapse from '../../Atoms/Collapse'
import ESCollapsePanel from '../../Atoms/Collapse/CollapsePanel'
import SANHelpHeader from './Header'
import questionsData from './questionsData.json';
import { useTranslation } from 'react-i18next'



const ESHelpCenterTemplate = ({
    bordered,
    accordion,
    expandIconPosition,
    placeholder
}) => {
    let [helpCenterData, sethelpCenterData] = useState(questionsData);

    const { t } = useTranslation('sanarui')
    const classes = classNames('es-help-center-template')
    const classesInfo = classNames('es-help-center-template__content__infos','es-help-center-template__content__infos--large-margin')

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
            <SANHelpHeader placeholder={placeholder} getSearchData={getSearchData}></SANHelpHeader>
            <div className='es-help-center-template__content'>
                <div className={classesInfo}>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.0.title')}
                        subtitle={t('helpCenter.helpContent.0.subTitle')}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={bordered}
                        accordion={accordion}
                        expandIconPosition={expandIconPosition}
                    >
                        {helpCenterData.plataforma.map((plataforma, index) =>
                        <ESCollapsePanel key={plataforma.title} header={plataforma.title} customKey={`${index}`} >
                        <p>{plataforma.subtitle} </p>
                            </ESCollapsePanel>
                        )}
                    </ESCollapse>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.1.title')}
                        subtitle={t('helpCenter.helpContent.1.subTitle')}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={bordered}
                        accordion={accordion}
                        expandIconPosition={expandIconPosition}
                    >
                      {helpCenterData.cursos.map((cursos, index) =>
                        <ESCollapsePanel key={cursos.title} header={cursos.title} customKey={`${index}`} >
                            <p>{cursos.subtitle} </p>
                        </ESCollapsePanel>
                    )}
                    </ESCollapse>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.2.title')}
                        subtitle={t('helpCenter.helpContent.2.subTitle')}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={bordered}
                        accordion={accordion}
                        expandIconPosition={expandIconPosition}
                    >
                        {helpCenterData.cancelamento.map((cancelamento, index) =>
                        <ESCollapsePanel key={cancelamento.title} header={cancelamento.title} customKey={`${index}`} >
                            <p>{cancelamento.subtitle} </p>
                        </ESCollapsePanel>
                    )}
                    </ESCollapse>
                    <ESSessionTitle
                        title={t('helpCenter.helpContent.3.title')}
                        subtitle={t('helpCenter.helpContent.3.subTitle')}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={bordered}
                        accordion={accordion}
                        expandIconPosition={expandIconPosition}
                    >
                        {helpCenterData.outros.map((outros, index) =>
                        <ESCollapsePanel key={outros.title} header={outros.title} customKey={`${index}`} >
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
    bordered: PropTypes.bool,
    accordion: PropTypes.bool,
    expandIconPosition: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string
}
ESHelpCenterTemplate.defaultProps = {}

export default ESHelpCenterTemplate
