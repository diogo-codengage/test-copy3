import React, { useState, useRef, useEffect } from 'react'

import { theme } from 'styled-tools'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANFormItem,
    SANRow,
    SANCol,
    SANSelect,
    SANSelectOption,
    SANDatePicker,
    SANSwitch,
    SANBox,
    SANCollapse,
    SANCollapsePanel,
    SANEvaIcon,
    SANTypography,
    SANSpin
} from '@sanar/components'

import useOnClickOutside from 'sanar-ui/dist/Hooks/useOnClickOutside'

import {
    GET_INSTITUTIONS,
    IInstitution,
    IInstitutionsQuery
} from 'Apollo/PracticalArea/Queries/institutions'

const Title: React.FC = props => (
    <SANBox
        display='flex'
        alignItems='center'
        justifyContent='center'
        color='grey.6'
    >
        <SANEvaIcon name='options-2-outline' mr='sm' />
        <SANTypography {...props} fontWeight='bold' />
    </SANBox>
)

const SwitchStyled = styled(SANFormItem)`
    && {
        background-color: ${theme('colors.grey-solid.1')};
        border-radius: ${theme('radii.base')};
        border: 1px solid ${theme('colors.grey.1')};
        text-align: center;

        ${theme('mediaQueries.down.xs')} {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${theme('space.xxs')} ${theme('space.md')};

            & div:first-child {
                flex: 3;
            }

            & > div {
                padding: 0;
                flex: 1;
            }
        }
    }
`

interface IRMFilterAdvancedProps {
    defaultOpen?: boolean
}

const RMFilterAdvanced = ({ defaultOpen }: IRMFilterAdvancedProps) => {
    const client = useApolloClient()
    const itemPickerRef = useRef<HTMLSpanElement>(null)
    const { t } = useTranslation('resmed')
    const [open, setOpen] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [loading, setLoading] = useState({
        intitutions: false,
        categories: false,
        specialties: false,
        subspecialties: false,
        themes: false
    })
    const [intitutions, setIntitutions] = useState<IInstitution[]>([])

    const fetchIntitutions = async () => {
        setLoading(old => ({ ...old, intitutions: true }))
        try {
            const {
                data: { institutions }
            } = await client.query<IInstitutionsQuery>({
                query: GET_INSTITUTIONS
            })
            setIntitutions(institutions)
        } catch {}
        setLoading(old => ({ ...old, intitutions: false }))
    }

    useEffect(() => {
        fetchIntitutions()
    }, [])

    useOnClickOutside([itemPickerRef], () => setOpenCalendar(false), [
        itemPickerRef,
        setOpenCalendar
    ])

    return (
        <SANCollapse
            accordion={true}
            onChange={setOpen}
            defaultActiveKey={defaultOpen && '1'}
        >
            <SANCollapsePanel
                header={
                    <Title>
                        {open
                            ? t('practicalArea.filter.advanced.title.open')
                            : t('practicalArea.filter.advanced.title.close')}
                    </Title>
                }
                showArrow={false}
                key='1'
            >
                {' '}
                <SANSpin spinning={loading.categories}>
                    <SANBox
                        mx={{ lg: 9, _: '0' }}
                        mt={{ lg: 'xxl', _: 'lg' }}
                        mb={{ lg: 'xxl', _: 'lg' }}
                    >
                        <SANRow gutter={24}>
                            <SANCol xs={24} sm={12}>
                                <SANFormItem
                                    name='institution'
                                    label={t(
                                        'practicalArea.filter.advanced.institution.title'
                                    )}
                                >
                                    <SANSelect
                                        placeholder={t(
                                            'practicalArea.filter.advanced.institution.placeholder'
                                        )}
                                        showArrow
                                        size='large'
                                    >
                                        {intitutions.map(intitution => (
                                            <SANSelectOption
                                                value={intitution.value}
                                                key={intitution.value}
                                            >
                                                {intitution.label}
                                            </SANSelectOption>
                                        ))}
                                    </SANSelect>
                                </SANFormItem>
                            </SANCol>
                            <SANCol xs={24} sm={12}>
                                <span ref={itemPickerRef}>
                                    <SANFormItem
                                        name='year'
                                        label={t(
                                            'practicalArea.filter.advanced.year.title'
                                        )}
                                        trigger={'onPanelChange'}
                                    >
                                        <SANDatePicker
                                            placeholder={t(
                                                'practicalArea.filter.advanced.year.placeholder'
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
                                    </SANFormItem>
                                </span>
                            </SANCol>
                            <SANCol xs={24} sm={12}>
                                <SANFormItem
                                    name='state'
                                    label={t(
                                        'practicalArea.filter.advanced.state.title'
                                    )}
                                >
                                    <SANSelect
                                        placeholder={t(
                                            'practicalArea.filter.advanced.state.placeholder'
                                        )}
                                        showArrow
                                        size='large'
                                    >
                                        <SANSelectOption value='jack'>
                                            Jack
                                        </SANSelectOption>
                                    </SANSelect>
                                </SANFormItem>
                            </SANCol>
                            <SANCol xs={24} sm={6}>
                                <SwitchStyled
                                    name='onlyHasImages'
                                    label={t(
                                        'practicalArea.filter.advanced.onlyHasImages'
                                    )}
                                    valuePropName='checked'
                                >
                                    <SANSwitch />
                                </SwitchStyled>
                            </SANCol>
                            <SANCol xs={24} sm={6}>
                                <SwitchStyled
                                    name='onlyComments'
                                    label={t(
                                        'practicalArea.filter.advanced.onlyComments'
                                    )}
                                    valuePropName='checked'
                                >
                                    <SANSwitch />
                                </SwitchStyled>
                            </SANCol>
                        </SANRow>
                    </SANBox>
                </SANSpin>
            </SANCollapsePanel>
        </SANCollapse>
    )
}

export default RMFilterAdvanced
