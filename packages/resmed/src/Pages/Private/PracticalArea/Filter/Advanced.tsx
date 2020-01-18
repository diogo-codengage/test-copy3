import React, { useState, useEffect, useCallback, memo } from 'react'

import { theme } from 'styled-tools'
import { space } from 'styled-system'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANFormItem,
    SANRow,
    SANCol,
    SANSelect,
    SANSelectOption,
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
        <SANEvaIcon name='options-2-outline' mr='sm'/>
        <SANTypography {...props} fontWeight='bold'/>
    </SANBox>
)

const SwitchStyled = styled(SANFormItem)`
    && {
        background-color: ${theme('colors.grey-solid.1')};
        border-radius: ${theme('radii.base')};
        border: 1px solid ${theme('colors.grey.1')};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: ${theme('space.md')};
        padding-right: ${theme('space.md')};
        width: 100%;

        & > div:first-child {
            flex: 3;
            text-align: left;
            white-space: nowrap;
        }

        & > div {
            padding: 0;
            flex: 1;
            text-align: right;
        }

        ${theme('mediaQueries.down.xs')} {
            padding-top: ${theme('space.xxs')};
            padding-bottom: ${theme('space.xxs')};
            margin-bottom: 0;
        }
        ${space}
    }
`

export const OnlyComments = props => {
    const { t } = useTranslation('resmed')
    const {
        state: { filter }
    } = useQuestionsContext()
    return (
        <SwitchStyled
            name='onlyComments'
            label={t('practicalArea.filter.advanced.onlyComments')}
            valuePropName='checked'
            initialValue={!!filter && filter.onlyComments}
            {...props}
        >
            <SANSwitch />
        </SwitchStyled>
    )
}

interface IRMFilterAdvancedProps {
    defaultOpen?: boolean
}

const RMFilterAdvanced = memo<IRMFilterAdvancedProps>(({ defaultOpen }) => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const {
        state: { filter }
    } = useQuestionsContext()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState({
        institutions: false,
        categories: false,
        specialties: false,
        subspecialties: false,
        themes: false,
        states: false
    })
    const [institutions, setInstitutions] = useState<IInstitution[]>([])
    const [states, setStates] = useState<IState[]>([])
    const [years, setYears] = useState<Number[]>([])

    useEffect(() => {
        const createYearsList = () => {
            const currentYear = new Date().getFullYear()
            let startYear = 2009
            const years: Number[] = []
            while (startYear < currentYear) {
                years.push(startYear++)
            }
            setYears(years.reverse());
        }
        createYearsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchInstitutions = async () => {
            setLoading(old => ({ ...old, institutions: true }))
            try {
                const {
                    data: { institutions }
                } = await client.query<IInstitutionsQuery>({
                    query: GET_INSTITUTIONS
                })
                setInstitutions(
                    institutions.map(v => ({
                        ...v,
                        label: v.label.toLowerCase()
                    }))
                )
            } catch {
            }
            setLoading(old => ({ ...old, institutions: false }))
        }
        fetchInstitutions()
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
            } catch {
            }
            setLoading(old => ({ ...old, states: false }))
        }
        fetchStates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderInstitution = useCallback(
        institution => (
            <SANSelectOption value={institution.value} key={institution.value}>
                {institution.label}
            </SANSelectOption>
        ),
        []
    )

    const renderOption = useCallback(
        option => (
            <SANSelectOption value={option} key={option}>
                {option}
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
                <SANBox mx={{ lg: 9, _: '0' }} mt={{ lg: 'xxl', _: '0' }}>
                    <SANRow gutter={24}>
                        <SANCol xs={24} sm={12}>
                            <SANFormItem
                                name='state'
                                label={t(
                                    'practicalArea.filter.advanced.state.title'
                                )}
                                initialValue={!!filter && filter.state}
                            >
                                <SANSelect
                                    loading={loading.states}
                                    placeholder={t(
                                        'practicalArea.filter.advanced.state.placeholder'
                                    )}
                                    allowClear
                                    size='large'
                                >
                                    {states.map(renderOption)}
                                </SANSelect>
                            </SANFormItem>
                        </SANCol>
                        <SANCol xs={24} sm={12}>
                            <SANFormItem
                                name='institution'
                                label={t(
                                    'practicalArea.filter.advanced.institution.title'
                                )}
                                initialValue={!!filter && filter.institutions}
                            >
                                <SANSelect
                                    mode={'multiple'}
                                    loading={loading.institutions}
                                    placeholder={t(
                                        'practicalArea.filter.advanced.institution.placeholder'
                                    )}
                                    allowClear
                                    size='large'
                                >
                                    {institutions.map(renderInstitution)}
                                </SANSelect>
                            </SANFormItem>
                        </SANCol>
                        <SANCol xs={24} sm={12}>
                            <SANFormItem
                                name='year'
                                label={t(
                                    'practicalArea.filter.advanced.year.title'
                                )}
                                initialValue={!!filter && filter.years}
                            >
                                <SANSelect
                                    mode={'multiple'}
                                    placeholder={t(
                                        'practicalArea.filter.advanced.year.placeholder',
                                        {
                                            min: 2009,
                                            max: new Date().getFullYear() - 1
                                        }
                                    )}
                                    allowClear
                                    size='large'
                                >
                                    {years.map(renderOption)}
                                </SANSelect>
                            </SANFormItem>
                        </SANCol>
                        <SANCol xs={24} sm={12}>
                            <SwitchStyled
                                mt={{ xs: '22px', _: '0' }}
                                initialValue={!!filter && filter.onlyHasImages}
                                name='onlyHasImages'
                                label={t(
                                    'practicalArea.filter.advanced.onlyHasImages'
                                )}
                                valuePropName='checked'
                            >
                                <SANSwitch/>
                            </SwitchStyled>
                        </SANCol>
                    </SANRow>
                </SANBox>
            </SANCollapsePanel>
        </SANCollapse>
    )
})

export default RMFilterAdvanced
