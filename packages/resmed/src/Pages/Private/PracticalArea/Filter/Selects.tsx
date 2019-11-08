import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANCol,
    SANRow,
    SANFormItem,
    SANCardSelectFilter
} from '@sanar/components'

import specialtySvg from 'Assets/images/practical-area/specialty.svg'
import subspecialtySvg from 'Assets/images/practical-area/subspecialty.svg'
import themeSvg from 'Assets/images/practical-area/theme.svg'

const RMFilterSelects = () => {
    const { t } = useTranslation('resmed')

    return (
        <>
            <SANRow gutter={24}>
                <SANCol xs={24} sm={24} md={12}>
                    <SANFormItem name='categories' mb={{ xs: 'xl', _: 'md' }}>
                        <SANCardSelectFilter
                            labelSelecteds={t(
                                'practicalArea.filter.selecteds.category.selecteds'
                            )}
                            placeholder={t(
                                'practicalArea.filter.selecteds.category.choose'
                            )}
                            filterName={t(
                                'practicalArea.filter.selecteds.category.title'
                            )}
                            image={specialtySvg}
                            items={[]}
                        />
                    </SANFormItem>
                </SANCol>
                <SANCol xs={24} sm={24} md={12}>
                    <SANFormItem name='specialties' mb={{ xs: 'xl', _: 'md' }}>
                        <SANCardSelectFilter
                            labelSelecteds={t(
                                'practicalArea.filter.selecteds.specialty.selecteds'
                            )}
                            placeholder={t(
                                'practicalArea.filter.selecteds.specialty.choose'
                            )}
                            filterName={t(
                                'practicalArea.filter.selecteds.specialty.title'
                            )}
                            image={specialtySvg}
                            items={[]}
                        />
                    </SANFormItem>
                </SANCol>
                <SANCol xs={24} sm={24} md={12}>
                    <SANFormItem
                        name='subspecialties'
                        mb={{ xs: 'xl', _: 'md' }}
                    >
                        <SANCardSelectFilter
                            labelSelecteds={t(
                                'practicalArea.filter.selecteds.subspecialty.selecteds'
                            )}
                            placeholder={t(
                                'practicalArea.filter.selecteds.subspecialty.choose'
                            )}
                            filterName={t(
                                'practicalArea.filter.selecteds.subspecialty.title'
                            )}
                            image={subspecialtySvg}
                            items={[]}
                        />
                    </SANFormItem>
                </SANCol>
                <SANCol xs={24} sm={24} md={12}>
                    <SANFormItem name='themes' mb={{ xs: 'xl', _: 'md' }}>
                        <SANCardSelectFilter
                            labelSelecteds={t(
                                'practicalArea.filter.selecteds.theme.selecteds'
                            )}
                            placeholder={t(
                                'practicalArea.filter.selecteds.theme.choose'
                            )}
                            filterName={t(
                                'practicalArea.filter.selecteds.theme.title'
                            )}
                            image={themeSvg}
                            items={[]}
                        />
                    </SANFormItem>
                </SANCol>
            </SANRow>
        </>
    )
}

export default RMFilterSelects
