import React from 'react'

import { useTranslation } from 'react-i18next'

import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESCardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'
import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import bancaSvg from 'assets/images/questions/banca.svg'
import moduloSvg from 'assets/images/questions/modulo.svg'
import assuntoSvg from 'assets/images/questions/assunto.svg'
import provaSvg from 'assets/images/questions/prova.svg'

import SANQuestionsFilterAdvanced from './Advanced'

const intlPath = 'questionBase.filter.'

const items = Array.from(new Array(50), (_, i) => ({
    label: `Item ${i}`,
    value: i
}))

const SANQuestionsFilterSelects = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='questions-filter'>
            <SANPortalPagesContainer>
                <ESRow gutter={24}>
                    <ESCol sm={24} md={12}>
                        <ESFormItem name='subject'>
                            <ESCardSelectFilter
                                labelSelecteds={t(
                                    `${intlPath}subject.selecteds`
                                )}
                                placeholder={t(`${intlPath}subject.choose`)}
                                filterName={t(`${intlPath}subject.title`)}
                                image={moduloSvg}
                                items={items}
                            />
                        </ESFormItem>
                    </ESCol>
                    <ESCol sm={24} md={12}>
                        <ESFormItem name='discipline'>
                            <ESCardSelectFilter
                                labelSelecteds={t(
                                    `${intlPath}discipline.selecteds`
                                )}
                                placeholder={t(`${intlPath}discipline.choose`)}
                                filterName={t(`${intlPath}discipline.title`)}
                                image={assuntoSvg}
                                items={items}
                            />
                        </ESFormItem>
                    </ESCol>
                    <ESCol sm={24} md={12}>
                        <ESFormItem name='bank' className='mb-lg'>
                            <ESCardSelectFilter
                                labelSelecteds={t(`${intlPath}bank.selecteds`)}
                                placeholder={t(`${intlPath}bank.choose`)}
                                filterName={t(`${intlPath}bank.title`)}
                                image={bancaSvg}
                                items={items}
                            />
                        </ESFormItem>
                    </ESCol>
                    <ESCol sm={24} md={12}>
                        <ESFormItem name='proof' className='mb-lg'>
                            <ESCardSelectFilter
                                labelSelecteds={t(`${intlPath}test.selecteds`)}
                                placeholder={t(`${intlPath}test.choose`)}
                                filterName={t(`${intlPath}test.title`)}
                                image={provaSvg}
                                items={items}
                            />
                        </ESFormItem>
                    </ESCol>
                </ESRow>
                <SANQuestionsFilterAdvanced />
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANQuestionsFilterSelects
