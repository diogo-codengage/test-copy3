import React, { useState, useCallback, useEffect } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANSelect,
    SANSelectOption,
    SANSessionTitle,
    SANLayoutContainer,
    SANButton,
    ISANButtonProps,
    SANEvaIcon,
    SANDivider,
    SANTypography,
    SANRow,
    SANCol,
    SANCollapse,
    SANCollapsePanel,
    SANSelectFilter
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'
import { useExamFilterContext, IFilters } from './Context'

interface ISelectWrapperProps {
    label: string
    isLast?: boolean
}

const SelectStyled = styled(SANSelectFilter)`
    & .es-checkbox:hover {
        background-color: ${theme('colors.primary-10')};
    }
`

const SelectWrapper: React.FC<ISelectWrapperProps> = ({
    label,
    isLast,
    children
}) => (
    <SANBox mb={!isLast ? 'xl' : '0'}>
        <SANTypography fontWeight='bold' mb='md'>
            {label}
        </SANTypography>
        {children}
    </SANBox>
)

const Button: React.FC<ISANButtonProps> = ({ children, ...props }) => (
    <SANButton size='small' bold variant='outlined' blockOnlyMobile {...props}>
        <SANEvaIcon name='options-2-outline' mr='xxs' />
        {children}
    </SANButton>
)

interface IFLXExamFilterSimpleProps {
    previousFilters?: IFilters
    applyFilter: () => void
}

const getIds = arr => arr.map(item => item.value)

const renderItem = item => (
    <SANSelectOption value={item.value}>{item.label}</SANSelectOption>
)

const getValue = (arr, values) =>
    arr.filter(item => values.includes(item.value))

const Fields: React.FC<{ hasLast?: boolean, filters?: IFilters }> = ({ hasLast, filters }) => {
    const { t } = useTranslation('sanarflix')
    const {
        state,
        handleUniversity,
        handleDiscipline,
        handleTheme,
        handleSemester,
        universities,
        loadingUniversities,
        disciplines,
        themes,
        semesters
    } = useExamFilterContext()

    useEffect(() => {
        if (!filters) return
        const changeStateValues = () => {
            console.log('state', state)
            // handleUniversity(filters.university)
            // handleDiscipline(filters.discipline)
            // handleTheme(filters.theme)
            // handleSemester(filters.semester)
        }
        changeStateValues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    const getDisciplines = useCallback(getValue, [
        disciplines,
        state.discipline
    ])

    const getThemes = useCallback(getValue, [themes, state.theme])

    const getSemesters = useCallback(getValue, [semesters, state.semester])

    const onChangeDiscipline = useCallback(
        items => handleDiscipline(getIds(items)),
        [handleDiscipline]
    )

    const onChangeThemes = useCallback(items => handleTheme(getIds(items)), [
        handleTheme
    ])

    const onChangeSemesters = useCallback(
        items => handleSemester(getIds(items)),
        [handleSemester]
    )

    return (
        <>
            <SANCol xs={24} md={12} lg={6}>
                <SelectWrapper label={t('examFilter.college.title')}>
                    <SANSelect
                        allowClear
                        placeholder={t('examFilter.college.select')}
                        size='large'
                        style={{ width: '100%' }}
                        value={state.university || undefined}
                        onChange={handleUniversity}
                        loading={loadingUniversities}
                    >
                        {universities.map(renderItem)}
                    </SANSelect>
                </SelectWrapper>
            </SANCol>
            <SANCol xs={24} md={12} lg={6}>
                <SelectWrapper label={t('examFilter.subject.title')}>
                    <SelectStyled
                        disabled={!state.university}
                        value={getDisciplines(disciplines, state.discipline)}
                        onChange={onChangeDiscipline}
                        placeholder={t('examFilter.subject.select')}
                        InputProps={{ size: 'large' }}
                        items={disciplines}
                        EmptyProps={{
                            py: 'md',
                            ImageProps: {
                                width: '100'
                            },
                            TypographyProps: {
                                fontSize: 'sm'
                            }
                        }}
                    />
                </SelectWrapper>
            </SANCol>
            <SANCol xs={24} md={12} lg={6}>
                <SelectWrapper label={t('examFilter.theme.title')}>
                    <SelectStyled
                        disabled={!state.discipline.length}
                        value={getThemes(themes, state.theme)}
                        onChange={onChangeThemes}
                        placeholder={t('examFilter.theme.select')}
                        InputProps={{ size: 'large' }}
                        items={themes}
                        EmptyProps={{
                            py: 'md',
                            ImageProps: {
                                width: '100'
                            },
                            TypographyProps: {
                                fontSize: 'sm'
                            }
                        }}
                    />
                </SelectWrapper>
            </SANCol>
            <SANCol xs={24} md={12} lg={6}>
                <SelectWrapper
                    label={t('examFilter.semester.title')}
                    isLast={hasLast}
                >
                    <SelectStyled
                        disabled={!state.theme.length}
                        value={getSemesters(semesters, state.semester)}
                        onChange={onChangeSemesters}
                        placeholder={t('examFilter.semester.select')}
                        InputProps={{ size: 'large' }}
                        items={semesters}
                        label='value'
                        EmptyProps={{
                            py: 'md',
                            ImageProps: {
                                width: '100'
                            },
                            TypographyProps: {
                                fontSize: 'sm'
                            }
                        }}
                    />
                </SelectWrapper>
            </SANCol>
        </>
    )
}

const FLXExamFilterSimpleMobile: React.FC<IFLXExamFilterSimpleProps> = (props) => {
    const { t } = useTranslation('sanarflix')
    const { state } = useExamFilterContext()
    const [hasOpen, toggleOpen] = useState(false)

    return (
        <SANBox py={{ md: '8', _: 'xl' }} bg='grey-solid.1'>
            <SANLayoutContainer>
                <SANSessionTitle
                    title={t('examFilter.simple.title')}
                    subtitle={t('examFilter.simple.subtitle')}
                />
                <SANCollapse accordion bordered={false} onChange={toggleOpen}>
                    <SANCollapsePanel
                        style={{ border: 'none' }}
                        showArrow={false}
                        header={
                            <SANBox m='-12px'>
                                <Button>
                                    {hasOpen
                                        ? t('examFilter.simple.closeFilters')
                                        : t('examFilter.simple.seeFilters')}
                                </Button>
                            </SANBox>
                        }
                    >
                        <SANBox mx='-16px'>
                            <SANDivider
                                width='100%'
                                bg='grey.2'
                                mb='xl'
                                mt='sm'
                            />
                            <SANRow gutter={20}>
                                <Fields filters={props.previousFilters}/>
                                <SANCol xs={24}>
                                    <Button
                                        disabled={!state.university}
                                        onClick={props.applyFilter}
                                    >
                                        {t('examFilter.simple.saveFilter')}
                                    </Button>
                                </SANCol>
                            </SANRow>
                        </SANBox>
                    </SANCollapsePanel>
                </SANCollapse>
            </SANLayoutContainer>
        </SANBox>
    )
}

const FLXExamFilterSimple: React.FC<IFLXExamFilterSimpleProps> = (props) => {
    const { t } = useTranslation('sanarflix')
    const { width } = useWindowSize()
    const { state } = useExamFilterContext()

    if (width <= 768) {
        return <FLXExamFilterSimpleMobile {...props} />
    }

    return (
        <SANBox py={{ md: '8', _: 'xl' }} bg='grey-solid.1'>
            <SANLayoutContainer>
                <SANSessionTitle
                    title={t('examFilter.simple.title')}
                    subtitle={t('examFilter.simple.title')}
                    extra={
                        <Button
                            disabled={!state.university}
                            onClick={props.applyFilter}
                        >
                            {t('examFilter.simple.saveFilter')}
                        </Button>
                    }
                />
                <SANDivider width='100%' bg='grey.2' mb='xl' />
                <SANRow gutter={20}>
                    <Fields hasLast filters={props.previousFilters}/>
                </SANRow>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default FLXExamFilterSimple
