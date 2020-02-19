import React from 'react'

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

import { withFLXExamFilterProvider, useExamFilterContext } from './Context'

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

const Button: React.FC = ({ children, ...props }) => (
    <SANButton size='small' bold variant='outlined' blockOnlyMobile {...props}>
        <SANEvaIcon name='options-2-outline' mr='xxs' />
        {children}
    </SANButton>
)

interface IFLXExamFilterSimpleProps {}

const getIds = arr => arr.map(item => item.value)

const Fields: React.FC<{ hasLast?: boolean }> = ({ hasLast }) => {
    const { t } = useTranslation('sanarflix')
    const {
        state,
        handleCollege,
        handleSubject,
        handleTheme,
        handleSemester
    } = useExamFilterContext()

    return (
        <>
            <SANCol xs={24} md={12} lg={6}>
                <SelectWrapper label={t('examFilter.college.title')}>
                    <SANSelect
                        allowClear
                        placeholder={t('examFilter.college.select')}
                        size='large'
                        style={{ width: '100%' }}
                        value={state.college}
                        onChange={handleCollege}
                    >
                        <SANSelectOption value='1'>1</SANSelectOption>
                        <SANSelectOption value='2'>2</SANSelectOption>
                        <SANSelectOption value='3'>3</SANSelectOption>
                    </SANSelect>
                </SelectWrapper>
            </SANCol>
            <SANCol xs={24} md={12} lg={6}>
                <SelectWrapper label={t('examFilter.subject.title')}>
                    <SelectStyled
                        disabled={!state.college}
                        onChange={items => handleSubject(getIds(items))}
                        placeholder={t('examFilter.subject.select')}
                        InputProps={{ size: 'large' }}
                        items={[
                            { value: '1', label: 'Disciplina 1' },
                            { value: '2', label: 'Disciplina 2' },
                            { value: '2', label: 'Disciplina 3' },
                            { value: '2', label: 'Disciplina 4' },
                            { value: '2', label: 'Disciplina 5' }
                        ]}
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
                        disabled={!state.subject.length}
                        onChange={items => handleTheme(getIds(items))}
                        placeholder={t('examFilter.theme.select')}
                        InputProps={{ size: 'large' }}
                        items={[
                            { value: '1', label: 'Tema 1' },
                            { value: '2', label: 'Tema 2' },
                            { value: '2', label: 'Tema 3' },
                            { value: '2', label: 'Tema 4' },
                            { value: '2', label: 'Tema 5' }
                        ]}
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
                        onChange={items => handleSemester(getIds(items))}
                        placeholder={t('examFilter.semester.select')}
                        InputProps={{ size: 'large' }}
                        items={[
                            { value: '1', label: '2020.1' },
                            { value: '2', label: '2020.2' },
                            { value: '1', label: '2019.1' },
                            { value: '2', label: '2019.2' }
                        ]}
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

const FLXExamFilterSimpleMobile: React.FC<IFLXExamFilterSimpleProps> = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANBox py={{ md: '8', _: 'xl' }} bg='grey-solid.1'>
            <SANLayoutContainer>
                <SANSessionTitle
                    title={t('examFilter.simple.title')}
                    subtitle={t('examFilter.simple.title')}
                />
                <SANCollapse accordion bordered={false}>
                    <SANCollapsePanel
                        style={{ border: 'none' }}
                        showArrow={false}
                        header={
                            <SANBox m='-12px'>
                                <Button>
                                    {true
                                        ? t('examFilter.simple.seeFilters')
                                        : t('examFilter.simple.closeFilters')}
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
                                <Fields />
                                <SANCol>
                                    <Button>
                                        {t('examFilter.simple.closeFilters')}
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

const FLXExamFilterSimple: React.FC<IFLXExamFilterSimpleProps> = () => {
    const { t } = useTranslation('sanarflix')
    const { width } = useWindowSize()

    if (width <= 768) {
        return <FLXExamFilterSimpleMobile />
    }

    return (
        <SANBox py={{ md: '8', _: 'xl' }} bg='grey-solid.1'>
            <SANLayoutContainer>
                <SANSessionTitle
                    title={t('examFilter.simple.title')}
                    subtitle={t('examFilter.simple.title')}
                    extra={<Button>{t('examFilter.simple.saveFilter')}</Button>}
                />
                <SANDivider width='100%' bg='grey.2' mb='xl' />
                <SANRow gutter={20}>
                    <Fields hasLast />
                </SANRow>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withFLXExamFilterProvider(FLXExamFilterSimple)
