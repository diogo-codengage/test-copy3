import React, { useState, useRef } from 'react'

import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESSwitch from 'sanar-ui/dist/Components/Atoms/Switch'
import ESCheckbox, {
    ESCheckboxGroup
} from 'sanar-ui/dist/Components/Atoms/Checkbox'
import ESRadio, { ESRadioGroup } from 'sanar-ui/dist/Components/Atoms/Radio'
import ESCollapse, {
    ESCollapsePanel
} from 'sanar-ui/dist/Components/Atoms/Collapse'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESDatePicker from 'sanar-ui/dist/Components/Atoms/DatePicker'
import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import useOnClickOutside from 'sanar-ui/dist/Hooks/useOnClickOutside'

import { useQuestionsContext } from '../Context'

const Title = props => (
    <div className='d-flex align-items-center text-grey-7 justify-content-center'>
        <ESEvaIcon name='options-2-outline' className='mr-sm' />
        <ESTypography {...props} variant='subtitle2' strong />
    </div>
)
const intlPath = 'questionBase.filter.advanced.'

const SANQuestionsFilterAdvanced = ({ defaultOpen }) => {
    const itemPickerRef = useRef()
    const { t } = useTranslation('esanar')
    const { formState } = useQuestionsContext()
    const [open, setOpen] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)

    useOnClickOutside([itemPickerRef], () => setOpenCalendar(false), [
        itemPickerRef,
        setOpenCalendar
    ])

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
                        <ESCol xs={24} lg={7}>
                            <span ref={itemPickerRef}>
                                <ESFormItem
                                    name='year'
                                    label={t(`${intlPath}year.label`)}
                                    trigger={'onPanelChange'}
                                    initialValue={formState && formState.year}
                                >
                                    <ESDatePicker
                                        placeholder={t(
                                            `${intlPath}year.placeholder`
                                        )}
                                        mode='year'
                                        size='large'
                                        open={openCalendar}
                                        format='YYYY'
                                        onOpenChange={() =>
                                            setOpenCalendar(true)
                                        }
                                        onPanelChange={() =>
                                            setOpenCalendar(false)
                                        }
                                    />
                                </ESFormItem>
                            </span>
                        </ESCol>
                        <ESCol xs={24} lg={10}>
                            <ESFormItem
                                name='difficulty'
                                label={t(`${intlPath}difficulty.label`)}
                                className='no-margin'
                                initialValue={formState && formState.difficulty}
                            >
                                <ESCheckboxGroup
                                    className='checkbox disabled'
                                    disabled
                                >
                                    <ESCheckbox value='easy'>
                                        {t(
                                            `${intlPath}difficulty.options.easy`
                                        )}
                                    </ESCheckbox>
                                    <ESCheckbox value='intermediate'>
                                        {t(
                                            `${intlPath}difficulty.options.intermediate`
                                        )}
                                    </ESCheckbox>
                                    <ESCheckbox value='hard'>
                                        {t(
                                            `${intlPath}difficulty.options.hard`
                                        )}
                                    </ESCheckbox>
                                </ESCheckboxGroup>
                            </ESFormItem>
                        </ESCol>
                    </ESRow>
                    <ESRow gutter={44}>
                        <ESCol xs={24} lg={18}>
                            <ESFormItem
                                name='progress'
                                label={t(`${intlPath}progress.label`)}
                                className='no-margin'
                                initialValue={formState && formState.progress}
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
                        <ESCol xs={24} lg={6}>
                            <ESFormItem
                                name='isCommentedByExpert'
                                label={t(`${intlPath}justCommented`)}
                                className='switch'
                                valuePropName='checked'
                                initialValue={
                                    formState && formState.isCommentedByExpert
                                }
                            >
                                <ESSwitch />
                            </ESFormItem>
                        </ESCol>
                    </ESRow>
                </div>
            </ESCollapsePanel>
        </ESCollapse>
    )
}

export default SANQuestionsFilterAdvanced
