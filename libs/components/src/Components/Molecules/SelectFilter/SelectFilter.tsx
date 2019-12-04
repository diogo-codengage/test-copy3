import React, { useState, useRef, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import useOnClickOutside from 'sanar-ui/dist/Hooks/useOnClickOutside'

import { SANInput } from '../../Atoms/Input'
import { SANCheckbox } from '../../Atoms/Checkbox'
import { SANButton } from '../../Atoms/Button'
import { SANDivider } from '../../Atoms/Divider'
import { SANSpin } from '../../Atoms/Spin'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANSkeleton } from '../../Atoms/Skeleton'
import { SANDropdown } from '../../Atoms/Dropdown'
import { SANTypography } from '../../Atoms/Typography'
import { Scrollbars } from 'react-custom-scrollbars'
import { Empty } from 'antd'

interface IItem {
    label: string
    value: string
}

export interface ISANSelectFilterProps {
    labelSelecteds: string
    items: IItem[]
    value: IItem[]
    onOpen: (visible: boolean) => void
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
        <SANCheckbox
            key={item.id}
            onChange={onCheckboxChange(item)}
            checked={!!value.find(checkValue(item))}
            className='es-card-select-filter__menu__items--item'
        >
            {item.label.toLowerCase()}
        </SANCheckbox>
    ))

    return (
        <SANDropdown
            trigger={['click']}
            overlayClassName='es-card-select-filter__overlay'
            visible={open}
            getPopupContainer={() => dropdownRef && dropdownRef.current}
            overlay={
                <div ref={menuRef}>
                    <div className='es-card-select-filter__menu--buttons'>
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
                    </div>
                    <SANDivider />
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
                        <div className='es-card-select-filter__menu__items'>
                            {rows.length ? (
                                rows
                            ) : (
                                <Empty
                                    className='mt-md'
                                    description={t('selectFilter.noData')}
                                    style={{ height: 174 }}
                                />
                            )}
                        </div>
                    </Scrollbars>
                </div>
            }
        >
            <span style={{ width: '100%' }} ref={dropdownRef}>
                <SANInput
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
