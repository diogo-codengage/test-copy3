import React, { useState, useRef, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import useOnClickOutside from 'sanar-ui/dist/Hooks/useOnClickOutside'

import { SANBox } from '../../Atoms/Box'
import { SANInput } from '../../Atoms/Input'
import { SANCheckbox } from '../../Atoms/Checkbox'
import { SANButton } from '../../Atoms/Button'
import { SANDivider } from '../../Atoms/Divider'
import { SANDropdown } from '../../Atoms/Dropdown'
import { Scrollbars } from 'react-custom-scrollbars'
import { SANEmpty } from '../../Atoms/Empty'

import styled from 'styled-components'
import { theme } from 'styled-tools'

const SANStyledInput = styled(SANInput)`
    text-overflow: ellipsis;
    background-color: ${theme('colors.white.10')};
`
const SANStyledCheckbox = styled(SANCheckbox)`
    width: 100%;
    cursor: pointer;
    padding: 4px 12px;
    white-space: nowrap;
    margin: 0 !important;
    span {
        text-transform: capitalize;
    }

    :hover {
        background-color: ${theme('colors.white.10')};
    }
`

interface IItem {
    label: string
    value: string
}

export interface ISANSelectFilterProps {
    labelSelecteds: string
    items: IItem[]
    value: IItem[]
    onOpen: (visible: boolean) => void
    onClose: () => void
    onChange: (list: IItem[], item: IItem) => void
    onSelectAll: (list: IItem[]) => void
    onClear: () => void
    onSelectItem: (item: IItem) => void
    onDeselectItem: (item: IItem) => void
}

const SANSelectFilter = ({
    items,
    value = [],
    onOpen,
    onClose,
    onChange,
    onSelectAll,
    onClear,
    onSelectItem,
    onDeselectItem
}) => {
    const dropdownRef = useRef<any>()
    const menuRef = useRef()
    const { t } = useTranslation('components')
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState()
    const [labelSelecteds, setLabelSelecteds] = useState('')

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
        onSelectAll && onSelectAll(values, e)
        onChange && onChange(values, e)
        setLabelSelecteds(values.map(v => v.label).join(', '))
    }

    const handleClear = e => {
        onClear && onClear([], e)
        onChange && onChange([], e)
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
            setLabelSelecteds(old => `${old ? `${old}, ` : ''}${item.label}`)
            onSelectItem && onSelectItem(item)
            onChange && onChange([...value, item])
        } else {
            const newItems = value.filter(
                selected => selected.value !== item.value
            )
            onDeselectItem && onDeselectItem(item)
            onChange && onChange(newItems)
            setLabelSelecteds(
                old =>
                    `${old
                        .replace(`${item.label}, `, '')
                        .replace(`, ${item.label}`, '')
                        .replace(item.label, '')}`
            )
        }
    }

    const onFocus = () => (handleOpen(true), setSearch(''))

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
                      item.label.toLowerCase().match(search.toLowerCase())
                  )
                : items,
        [search, items]
    )

    const rows = filtered.map(item => (
        <SANStyledCheckbox
            key={item.id}
            onChange={onCheckboxChange(item)}
            checked={!!value.find(checkValue(item))}
        >
            {item.label.toLowerCase()}
        </SANStyledCheckbox>
    ))

    return (
        <SANDropdown
            trigger={['click']}
            visible={open}
            getPopupContainer={() => dropdownRef && dropdownRef.current}
            overlay={
                <div ref={menuRef}>
                    <SANBox
                        mt='6px'
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
                            <SANButton
                                onClick={handleClear}
                                bold
                                variant='text'
                                size='xsmall'
                                disabled={!value.length}
                            >
                                {t('selectFilter.clearSelect')}
                            </SANButton>
                        </SANBox>
                        <SANDivider
                            my='0'
                            mx='auto'
                            width='calc(100% - 24px)'
                            bg='grey.2'
                        />
                        <Scrollbars
                            autoHeight
                            autoHeightMax={198}
                            style={{
                                width: dropdownRef.current
                                    ? dropdownRef.current.offsetWidth
                                    : 426,
                                maxWidth: '100%'
                            }}
                        >
                            <SANBox py='xxs'>
                                {rows.length ? rows : <SANEmpty />}
                            </SANBox>
                        </Scrollbars>
                        <SANBox
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
                        </SANBox>
                    </SANBox>
                </div>
            }
        >
            <span style={{ width: '100%' }} ref={dropdownRef}>
                <SANStyledInput
                    onFocus={onFocus}
                    placeholder={t('selectFilter.select')}
                    iconLeft='search-outline'
                    onChange={handleSearch}
                    value={open ? search : labelSelecteds}
                />
            </span>
        </SANDropdown>
    )
}

export default SANSelectFilter
