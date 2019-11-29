import React, { useState, useEffect, useCallback } from 'react'

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
    SANTypography
} from '@sanar/components'

import {
    GET_INSTITUTIONS,
    IInstitution,
    IInstitutionsQuery
} from 'Apollo/PracticalArea/Queries/institutions'
import {
    GET_STATES,
    IStatesQuery,
    IState
} from 'Apollo/PracticalArea/Queries/states'
import { useQuestionsContext } from '../Context'

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
    const { t } = useTranslation('resmed')
    const {
        state: { filter }
    } = useQuestionsContext()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState({
        intitutions: false,
        categories: false,
        specialties: false,
        subspecialties: false,
        themes: false,
        states: false
    })
    const [intitutions, setIntitutions] = useState<IInstitution[]>([])
    const [states, setStates] = useState<IState[]>([])

    useEffect(() => {
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
        fetchIntitutions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchStates = async () => {
            setLoading(old => ({ ...old, states: true }))
            try {
                const {
                    data: { states }
                } = await client.query<IStatesQuery>({
                    query: GET_STATES
                })
                setStates(states)
            } catch {}
            setLoading(old => ({ ...old, states: false }))
        }
        fetchStates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderInstitution = useCallback(
        intitution => (
            <SANSelectOption value={intitution.value} key={intitution.value}>
                {intitution.label}
            </SANSelectOption>
        ),
        []
    )

    const renderState = useCallback(
        state => (
            <SANSelectOption value={state} key={state}>
                {state}
            </SANSelectOption>
        ),
        []
    )

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
                                initialValue={!!filter && filter.institution}
                            >
                                <SANSelect
                                    loading={loading.intitutions}
                                    placeholder={t(
                                        'practicalArea.filter.advanced.institution.placeholder'
                                    )}
                                    allowClear
                                    size='large'
                                >
                                    {intitutions.map(renderInstitution)}
                                </SANSelect>
                            </SANFormItem>
                        </SANCol>
                        <SANCol xs={24} sm={12}>
                            <SANFormItem
                                name='year'
                                label={t(
                                    'practicalArea.filter.advanced.year.title'
                                )}
                                trigger={'onPanelChange'}
                                initialValue={!!filter && filter.year}
                            >
                                <SANDatePicker
                                    placeholder={t(
                                        'practicalArea.filter.advanced.year.placeholder'
                                    )}
                                    mode='year'
                                    size='large'
                                    format='YYYY'
                                />
                            </SANFormItem>
                        </SANCol>
                        <SANCol xs={24} sm={12}>
                            <SANFormItem
                                name='state'
                                label={t(
                                    'practicalArea.filter.advanced.state.title'
                                )}
                                initialValue={!!filter && filter.state}
                            >
                                <SANSelect
                                    loading={loading.intitutions}
                                    placeholder={t(
                                        'practicalArea.filter.advanced.state.placeholder'
                                    )}
                                    allowClear
                                    size='large'
                                >
                                    {states.map(renderState)}
                                </SANSelect>
                            </SANFormItem>
                        </SANCol>
                        <SANCol xs={24} sm={6}>
                            <SwitchStyled
                                initialValue={!!filter && filter.onlyHasImages}
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
                                initialValue={!!filter && filter.onlyComments}
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
            </SANCollapsePanel>
        </SANCollapse>
    )
}

export default RMFilterAdvanced
