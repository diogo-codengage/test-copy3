import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESSessionTitle from '../../Molecules/SessionTitle'
import ESCollapse from '../../Atoms/Collapse'
import ESCollapsePanel from '../../Atoms/Collapse/CollapsePanel'
import SANHelpHeader from './Header'


import { select, text, boolean } from '@storybook/addon-knobs'


const positionOptions = {
    Left: 'left',
    Right: 'right'
}

const ESHelpCenterTemplate = ({
    className,
    actionsMargin
}) => {
    const classes = classNames('es-help-center-template', className)

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
            <SANHelpHeader></SANHelpHeader>
            <div className='es-help-center-template__content'>
                <div className={classesInfo}>
                    <ESSessionTitle
                        title={text('Title', 'Sobre a plataforma')}
                        subtitle={text(
                            'Subtitle',
                            'Perguntas sobre o acesso e o funcionamento da plataforma'
                        )}
                    />
                    <ESCollapse
                        className='mb-xxl'
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
                        <ESCollapsePanel header='Eu posso assistir o curso em qualquer lugar (Computador, celular, tablet)?' customKey='3'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Como posso tirar dúvidas com os professores?' customKey='4'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Como baixar o material complementar?' customKey='5'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                    </ESCollapse>
                    <ESSessionTitle
                        title={text('Title', 'Sobre o curso e as aulas')}
                        subtitle={text(
                            'Subtitle',
                            'Perguntas relacionadas ao curso e às aulas'
                        )}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select(
                            'Expand Icon Position',
                            positionOptions,
                            'right'
                        )}
                    >
                        <ESCollapsePanel
                            header={text('Header', 'O curso possui aulas atualizadas?')}
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
                        <ESCollapsePanel header='Eu posso baixar as vídeo aulas? E o material complementar?' customKey='2'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Eu posso ver as aulas quantas vezes eu quiser?' customKey='3'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Tem questões para treinar?' customKey='4'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Qual a duração das aulas?' customKey='5'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Tem certificado?' customKey='6'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                        <ESCollapsePanel header='Posso trocar o curso?' customKey='7'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                    </ESCollapse>
                    <ESSessionTitle
                        title={text('Title', 'Sobre cancelamento')}
                        subtitle={text(
                            'Subtitle',
                            'Perguntas sobre cancelamentos de cursos'
                        )}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select(
                            'Expand Icon Position',
                            positionOptions,
                            'right'
                        )}
                    >
                        <ESCollapsePanel
                            header={text('Header', 'Não gostei do curso, posso solicitar cancelamento?')}
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
                        <ESCollapsePanel header='Eu posso cancelar o curso e receber só as parcelas que faltam caso passe do prazo de solicitação?' customKey='2'>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra
                                nisi. Mauris aliquet nunc non turpis scelerisque, eget. Admodum
                                accumsan disputationi eu sit. Vide electram sadipscing et per.
                                Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.
                                Delegadis gente finis, bibendum egestas augue arcu ut est.
                            </p>
                        </ESCollapsePanel>
                    </ESCollapse>
                    <ESSessionTitle
                        title={text('Title', 'Outros tipos de perguntas')}
                        subtitle={text(
                            'Subtitle',
                            'Perguntas sobre temas gerais e problemas técnicos'
                        )}
                    />
                    <ESCollapse
                        className='mb-xxl'
                        bordered={boolean('Bordered', true)}
                        accordion={boolean('Accordion', false)}
                        expandIconPosition={select(
                            'Expand Icon Position',
                            positionOptions,
                            'right'
                        )}
                    >
                        <ESCollapsePanel
                            header={text('Header', 'O que são esses materiais complementares?')}
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
                        <ESCollapsePanel header='Estou com uma dúvida/problema técnico. Como posso entrar em contato?' customKey='2'>
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
    actionsMargin: PropTypes.oneOf(['default', 'large'])
}
ESHelpCenterTemplate.defaultProps = {
    actionsMargin: 'default'
}

export default ESHelpCenterTemplate
