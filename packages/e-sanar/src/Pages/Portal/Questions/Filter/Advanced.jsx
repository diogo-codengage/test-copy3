import React, { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESSwitch from 'sanar-ui/dist/Components/Atoms/Switch'
import ESRadio, { ESRadioGroup } from 'sanar-ui/dist/Components/Atoms/Radio'
import ESSelect, { ESOption } from 'sanar-ui/dist/Components/Atoms/Select'
import ESCollapse, {
    ESCollapsePanel
} from 'sanar-ui/dist/Components/Atoms/Collapse'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import { useQuestionsContext } from '../Context'

const Title = props => (
    <div className='d-flex align-items-center text-grey-7 justify-content-center'>
        <ESEvaIcon name='options-2-outline' className='mr-sm' />
        <ESTypography {...props} variant='subtitle2' strong />
    </div>
)
const intlPath = 'questionBase.filter.advanced.'

const SANQuestionsFilterAdvanced = ({ defaultOpen }) => {
    const { t } = useTranslation('esanar')
    const { formState } = useQuestionsContext()
    const [open, setOpen] = useState(false)
    const [years, setYears] = useState([])

    useEffect(() => {
        const createYearsList = () => {
            const currentYear = new Date().getFullYear()
            let startYear = 2009
            const years = []
            while (startYear < currentYear) {
                years.push(startYear++)
            }
            setYears(years.reverse())
        }
        createYearsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderOption = useCallback(
        option => (
            <ESOption value={option} key={option}>
                {option}
            </ESOption>
        ),
        []
    )

    return (
        <ESCollapse
            className={classNames('questions-filter__advanced', {
                'questions-filter__advanced--open': open
            })}
            accordion={true}
            onChange={setOpen}
            defaultActiveKey={defaultOpen && '1'}
        >
            <ESCollapsePanel
                header={
                    <Title>
                        {open ? t(`${intlPath}hide`) : t(`${intlPath}show`)}
                    </Title>
                }
                showArrow={false}
                key='1'
            >
                <div className='questions-filter__advanced__content'>
                    <ESRow gutter={32} className='mb-md mt-lg'>
                        <ESCol xs={24} sm={12} md={10} lg={10}>
                            <ESFormItem
                                name='years'
                                label={t(`${intlPath}year.label`)}
                                initialValue={!!formState && formState.years}
                            >
                                <ESSelect
                                    mode={'multiple'}
                                    placeholder={t(
                                        `${intlPath}year.placeholder`,
                                        {
                                            min: 2009,
                                            max: new Date().getFullYear() - 1
                                        }
                                    )}
                                    allowClear
                                    size='large'
                                >
                                    {years.map(renderOption)}
                                </ESSelect>
                            </ESFormItem>
                        </ESCol>
                        <ESCol xs={24} sm={12} md={14} lg={14}>
                            <ESFormItem
                                name='isCommentedByExpert'
                                label={t(`${intlPath}justCommented`)}
                                className='switch'
                                valuePropName='checked'
                                initialValue={
                                    !!formState && formState.isCommentedByExpert
                                }
                            >
                                <ESSwitch />
                            </ESFormItem>
                        </ESCol>
                    </ESRow>
                    <ESRow gutter={44}>
                        <ESCol xs={24} lg={18}>
                            <ESFormItem
                                name='progress'
                                label={t(`${intlPath}progress.label`)}
                                className='no-margin'
                                initialValue={!!formState && formState.progress}
                            >
                                <ESRadioGroup>
                                    <ESRow>
                                        <ESCol xs={24} md={6}>
                                            <ESRadio value={'1'}>
                                                {t(
                                                    `${intlPath}progress.options.all`
                                                )}
                                            </ESRadio>
                                        </ESCol>
                                        <ESCol xs={24} md={6}>
                                            <ESRadio value={'2'}>
                                                {t(
                                                    `${intlPath}progress.options.neverAnswered`
                                                )}
                                            </ESRadio>
                                        </ESCol>
                                        <ESCol xs={24} md={6}>
                                            <ESRadio value={'3'}>
                                                {t(
                                                    `${intlPath}progress.options.alreadyAnswered`
                                                )}
                                            </ESRadio>
                                        </ESCol>
                                        <ESCol xs={24} md={6}>
                                            <ESRadio value={'4'} disabled>
                                                {t(
                                                    `${intlPath}progress.options.issuesMissed`
                                                )}
                                            </ESRadio>
                                        </ESCol>
                                    </ESRow>
                                </ESRadioGroup>
                            </ESFormItem>
                        </ESCol>
                    </ESRow>
                </div>
            </ESCollapsePanel>
        </ESCollapse>
    )
}

export default SANQuestionsFilterAdvanced
