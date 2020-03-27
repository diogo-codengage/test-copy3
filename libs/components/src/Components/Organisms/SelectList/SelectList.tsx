import React, { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import {
    SANScroll,
    SANBox,
    SANInput,
    SANCheckbox,
    SANTypography,
    ISANTypographyProps,
    SANSkeleton,
    SANEmpty
} from '../../Atoms'

interface IItem {
    value: string
    label: string
}

export interface ISANSelectListProps {
    onChange: (items: string[]) => void
    value: string[]
    items: IItem[]
    placeholder: string
    loading?: boolean
    disabled?: boolean
    forceScroll?: boolean
}

interface IOnChange {
    value: string
    checked: boolean
}

interface IRowItem extends IItem {
    onChange: (e: IOnChange) => void
    checked: boolean
    disabled?: boolean
    TypographyProps?: ISANTypographyProps
}

const InputStyled = styled(SANInput)`
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;

    & > i:first-child {
        left: 16px;
    }

    & > input {
        padding-left: 41px;
    }
`

const RowItemStyled = styled(SANBox)<{ disabled?: boolean }>`
    ${ifProp(
        'disabled',
        css`
            cursor: not-allowed;
        `,
        css`
            cursor: pointer;
            &:hover {
                background-color: ${theme('colors.grey.0')};
            }
        `
    )}
`

const RowItem: React.FC<IRowItem> = ({
    label,
    value,
    onChange,
    checked,
    disabled,
    TypographyProps
}) => {
    const handleChange = () => {
        onChange({
            value,
            checked: !checked
        })
    }

    return (
        <RowItemStyled
            bg='white.10'
            p='md'
            borderBottom='1px solid'
            borderColor='grey.2'
            onClick={handleChange}
            disabled={disabled}
        >
            <SANCheckbox value={value} checked={checked} disabled={disabled}>
                <SANTypography
                    onClick={e => e.stopPropagation()}
                    fontWeight='bold'
                    fontSize='md'
                    as='span'
                    {...TypographyProps}
                >
                    {label}
                </SANTypography>
            </SANCheckbox>
        </RowItemStyled>
    )
}

const ALL_CHECKS = 'all'
const skeletons = new Array(5).fill(1)
const Skeleton = () => (
    <>
        {skeletons.map((_, index) => (
            <SANBox
                key={index}
                bg='white.10'
                px='md'
                pb='sm'
                pt='1px'
                borderBottom='1px solid'
                borderColor='grey.2'
            >
                <SANSkeleton paragraph={false} active />
            </SANBox>
        ))}
    </>
)

const SANSelectList: React.FC<ISANSelectListProps> = ({
    items = [],
    value = [],
    onChange,
    placeholder,
    loading,
    disabled,
    forceScroll
}) => {
    const { t } = useTranslation('components')
    const [search, setSearch] = useState('')

    const renderItem = (item: IItem) => (
        <RowItem
            {...item}
            key={item.value}
            onChange={handleChange}
            checked={!!value.find(v => v === item.value)}
            disabled={disabled}
        />
    )

    const handleChange = (e: IOnChange) => {
        const { value: currentValue, checked } = e
        if (currentValue === ALL_CHECKS) {
            if (checked) {
                const selecteds = items.map(item => item.value)
                onChange(selecteds)
            } else {
                onChange([])
            }
        } else {
            if (checked) {
                onChange([...value, currentValue])
            } else {
                const selecteds = value.filter(v => v !== currentValue)
                onChange(selecteds)
            }
        }
    }

    const handleSearch = e => {
        if (!loading) {
            setSearch(e.target.value)
        }
    }

    const hasAllChecks = useMemo(() => value.length === items.length, [
        value,
        items
    ])

    const filteredItems = useMemo(
        () =>
            items.filter(item => {
                const regex = new RegExp(search, 'gi')
                return regex.test(item.label)
            }),
        [value, search]
    )

    return (
        <SANBox
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            height={280}
            overflow={forceScroll ? 'scroll' : 'hidden'}
        >
            <InputStyled
                iconLeft='search-outline'
                size='xlarge'
                placeholder={placeholder}
                onChange={handleSearch}
                value={search}
                disabled={disabled}
            />
            <SANScroll>
                {loading ? (
                    <Skeleton />
                ) : filteredItems.length ? (
                    <>
                        <RowItem
                            TypographyProps={{
                                color: 'grey.4'
                            }}
                            label={
                                hasAllChecks
                                    ? t('selectList.deselectAll')
                                    : t('selectList.selectAll')
                            }
                            value={ALL_CHECKS}
                            checked={hasAllChecks}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                        {filteredItems.map(renderItem)}
                    </>
                ) : (
                    <SANEmpty py='lg' ImageProps={{ height: 143 }} />
                )}
            </SANScroll>
        </SANBox>
    )
}

export default SANSelectList
