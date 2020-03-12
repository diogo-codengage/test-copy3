import React, { useState, useEffect, useRef, useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import useOnClickOutside from '@sanar/utils/dist/Hooks/useOnClickOutside'

import { SANBox, ISANBoxProps } from '../../Atoms/Box'
import { SANInput, ISANInputProps } from '../../Atoms/Input'
import { SANCheckbox } from '../../Atoms/Checkbox'
import { SANButton } from '../../Atoms/Button'
import { SANDivider } from '../../Atoms/Divider'
import { SANDropdown } from '../../Atoms/Dropdown'
import { SANScroll } from '../../Atoms/Scroll'
import { SANEmpty, ISANEmptyProps } from '../../Atoms/Empty'

interface ISANStyledInputProps {
    hasError?: boolean
}

const SANStyledInput = styled(SANInput)<ISANStyledInputProps>`
    && {
        text-overflow: ellipsis;
        background-color: ${theme('colors.white.10')};

        ${ifProp(
            'hasError',
            css`
                border-color: ${theme('colors.error')};
            `
        )}
    }
`

const SANStyledCheckbox = styled(SANCheckbox)`
    && {
        width: 100%;
        cursor: pointer;
        padding: 4px 12px;
        white-space: nowrap;
        margin: 0 !important;
        span {
            text-transform: capitalize;
        }

        :hover {
            background-color: ${theme('colors.primary-1')};
        }
    }
`
const SANStyledButton = styled(SANButton)`
    && {
        color: ${theme('colors.grey.3')};
    }
`
const SANCloseButtonBox = styled(SANBox)`
    && {
        border-bottom-right-radius: ${theme('radii.base')};
        border-bottom-left-radius: ${theme('radii.base')};
    }
`

interface IItem {
    label: string
    value: string
}

export interface ISANSelectFilterProps
    extends Omit<ISANBoxProps, 'onChange' | 'color'> {
    label?: string
    placeholder?: string
    items: IItem[]
    value?: IItem[]
    onOpen?: (visible: boolean) => void
    onClose?: (e?: any) => void
    onChange?: (list: IItem[], item?: IItem) => void
    onSelectAll?: (list: IItem[]) => void
    onClear?: () => void
    onSelectItem?: (item: IItem) => void
    onDeselectItem?: (item: IItem) => void
    hasError?: boolean
    InputProps?: ISANInputProps
    EmptyProps?: ISANEmptyProps
    disabled?: boolean
}

const makeLabel = (value, field) =>
    value
        .map(
            lt =>
                `${lt[field].charAt(0).toUpperCase()}${lt[field]
                    .slice(1)
                    .toLowerCase()}`
        )
        .join(', ')

const SANSelectFilter: React.FC<ISANSelectFilterProps> = ({
    placeholder,
    items,
    value = [],
    onOpen,
    onClose,
    onChange,
    onSelectAll,
    onClear,
    onSelectItem,
    onDeselectItem,
    hasError,
    InputProps,
    EmptyProps,
    disabled,
    label: labelProp,
    ...props
}) => {
    const dropdownRef = useRef<any>()
    const menuRef = useRef()
    const { t } = useTranslation('components')
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [labelSelecteds, setLabelSelecteds] = useState('')

    const fieldLabel = useMemo(() => labelProp || 'label', [labelProp])

    const handleOpen = visibility => {
        setOpen(visibility)
        onOpen && onOpen(visibility)
    }

    const handleClose = e => {
        setOpen(false)
        onClose && onClose(e)
    }

    const handleSelectAll = values => e => {
        if (value.length === items.length) return
        onSelectAll && onSelectAll(values)
        onChange && onChange(values)
    }

    const handleClear = e => {
        onClear && onClear()
        onChange && onChange([])
        setLabelSelecteds('')
    }

    const handleSearch = e => {
        const {
            target: { value }
        } = e
        setSearch(value)
    }

    const handleChange = (item, e) => {
        const {
            target: { checked }
        } = e
        if (checked) {
            onSelectItem && onSelectItem(item)
            onChange && onChange([...value, item])
        } else {
            const newItems = value.filter(
                selected => selected.value !== item.value
            )
            onDeselectItem && onDeselectItem(item)
            onChange && onChange(newItems)
            !newItems[0] && setLabelSelecteds('')
        }
    }

    const onFocus = () => {
        handleOpen(true)
        setSearch('')
    }

    const clickOutside = () => {
        setSearch('')
        handleOpen(false)
    }

    useOnClickOutside([menuRef, dropdownRef], clickOutside, [
        menuRef,
        dropdownRef,
        clickOutside
    ])
    const onCheckboxChange = item => e => handleChange(item, e)

    const checkValue = item => val => val.value === item.value

    const filtered = useMemo(
        () =>
            search
                ? items.filter(item =>
                      item[fieldLabel].toLowerCase().match(search.toLowerCase())
                  )
                : items,
        [search, items]
    )

    const rows = filtered.map(item => (
        <SANStyledCheckbox
            key={item.value}
            onChange={onCheckboxChange(item)}
            checked={!!value.find(checkValue(item))}
        >
            {item[fieldLabel].toLowerCase()}
        </SANStyledCheckbox>
    ))

    useEffect(() => {
        if (!!value && !!value.length) {
            const label = makeLabel(value, fieldLabel)
            setLabelSelecteds(label)
        }
    }, [value])

    return (
        <SANBox {...props}>
            <SANDropdown
                mt='16px'
                trigger={['click']}
                visible={open}
                getPopupContainer={() => dropdownRef && dropdownRef.current}
                overlay={
                    <div ref={menuRef}>
                        <SANBox
                            width={
                                dropdownRef.current
                                    ? dropdownRef.current.offsetWidth
                                    : 426
                            }
                            mt='10px'
                            bg='white.10'
                            boxShadow='1'
                            borderRadius='base'
                            border='1px solid'
                            borderColor='grey.2'
                        >
                            <SANBox
                                displayFlex
                                alignItems='center'
                                justifyContent='center'
                                py='xxs'
                            >
                                <SANButton
                                    onClick={handleSelectAll(filtered)}
                                    bold
                                    variant='text'
                                    size='xsmall'
                                    className='mr-sm'
                                >
                                    {t('selectFilter.selectAll')}
                                </SANButton>
                                <SANStyledButton
                                    onClick={handleClear}
                                    bold
                                    variant='text'
                                    size='xsmall'
                                    disabled={!value.length}
                                >
                                    {t('selectFilter.clearSelect')}
                                </SANStyledButton>
                            </SANBox>
                            <SANDivider
                                my='0'
                                mx='auto'
                                width='calc(100% - 24px)'
                                bg='grey.2'
                            />
                            <SANScroll>
                                <SANBox py='xxs'>
                                    {rows.length ? (
                                        rows
                                    ) : (
                                        <SANEmpty {...EmptyProps} />
                                    )}
                                </SANBox>
                            </SANScroll>
                            <SANCloseButtonBox
                                displayFlex
                                alignItems='center'
                                justifyContent='center'
                                py='xxs'
                                bg='grey-solid.1'
                                borderTop='1px solid'
                                borderColor='grey.2'
                            >
                                <SANButton
                                    onClick={handleClose}
                                    bold
                                    variant='text'
                                    size='small'
                                    className='mr-sm'
                                    color='primary'
                                >
                                    {t('selectFilter.close')}
                                </SANButton>
                            </SANCloseButtonBox>
                        </SANBox>
                    </div>
                }
            >
                <span style={{ width: '100%' }} ref={dropdownRef}>
                    <SANStyledInput
                        onFocus={onFocus}
                        placeholder={
                            placeholder ? placeholder : t('selectFilter.select')
                        }
                        disabled={disabled}
                        iconLeft='search-outline'
                        onChange={handleSearch}
                        value={open ? search : labelSelecteds}
                        hasError={hasError}
                        {...InputProps}
                    />
                </span>
            </SANDropdown>
        </SANBox>
    )
}

export default SANSelectFilter
