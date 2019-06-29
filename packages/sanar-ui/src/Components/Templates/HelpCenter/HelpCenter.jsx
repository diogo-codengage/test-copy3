import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESBrandHeader from '../../Atoms/BrandHeader'
import ESTypography from '../../Atoms/Typography'
import ESCollapse from '../../Atoms/Collapse'
import ESCollapsePanel from '../../Atoms/Collapse/CollapsePanel'

import { select, text, boolean } from '@storybook/addon-knobs'


const positionOptions = {
    Left: 'left',
    Right: 'right'
}

const ESHelpCenterTemplate = ({
    className,
    actionsMargin,
    brandHeader
}) => {
    const classes = classNames('es-help-center-template', className, {
        'es-help-center-template--without-brand-header': !brandHeader
    })

    const classesInfo = classNames(
        'es-help-center-template__content__infos',
        className,
        {
            'es-help-center-template__content__infos--large-margin':
                actionsMargin === 'large'
        }
    )

    return (
        <div className={classes}>
            {brandHeader && (
                <ESBrandHeader className='es-help-center-template__header' />
            )}
            <div className='es-help-center-template__content'>
                <div className={classesInfo}>
                    <ESTypography
                        className='es-help-center-template__content__infos--title mb-md'
                        level={4}
                    >
                        Sobre a plataforma
                    </ESTypography>
                    <ESTypography
                        className='es-help-center-template__content__infos--subtitle'
                        variant='subtitle2'
                    >
                        Perguntas sobre o acesso.....
                    </ESTypography>
                    <ESCollapse
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select(
                            'Expand Icon Position',
                            positionOptions,
                            'right'
                        )}
                    >
                        <ESCollapsePanel
                            header={text('Header', 'Enquanto tempo meu acesso é liberado?')}
                            disabled={boolean('Disabled', false)}
                            showArrow={boolean('Show arrow', true)}
                            customKey='1'
                        >
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Durante quanto tempo tenho acesso ao curso?' customKey='2'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                    </ESCollapse>
                </div>
            </div>
        </div>
    )
}

ESHelpCenterTemplate.propTypes = {
    className: PropTypes.string,
    actionsMargin: PropTypes.oneOf(['default', 'large']),
    brandHeader: PropTypes.bool
}
ESHelpCenterTemplate.defaultProps = {
    actionsMargin: 'default',
    brandHeader: true
}

export default ESHelpCenterTemplate
