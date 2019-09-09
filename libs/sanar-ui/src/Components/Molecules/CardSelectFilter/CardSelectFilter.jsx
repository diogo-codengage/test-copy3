import React, { useState, useRef, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import useOnClickOutside from '../../../Hooks/useOnClickOutside'

import ESInput from '../../Atoms/Input'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESSkeleton from '../../Atoms/Skeleton'
import ESDropdown from '../../Atoms/Dropdown'
import ESTypography from '../../Atoms/Typography'
import ESCard from '../Card'

import ESCardSelectFilterMenu from './CardSelectFilterMenu'

const Badge = ({ count }) => (
    <div className='badge'>{count > 99 ? '99+' : count}</div>
)

const ESCardSelectFilter = ({
    className,
    placeholder,
    image,
    filterName,
    onSelectItem,
    onDeselectItem,
    onSelectAll,
    onClear,
    onClose,
    onOpen,
    items,
    labelSelecteds,
    onChange,
    value = [],
    disabled
}) => {
    const dropdownRef = useRef()
    const menuRef = useRef()
    const { t } = useTranslation('sanarui')
    const [loadImage, setLoadImage] = useState(true)
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState()
    const classes = classNames('es-card-select-filter', className)
    const classesFooter = classNames('es-card-select-filter__footer', {
        'es-card-select-filter__footer--checked': value.length
    })

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
    }

    const handleClear = e => {
        onClear && onClear([], e)
        onChange && onChange([], e)
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
        }
    }

    const onFocus = () => handleOpen(true)

    const clickOutside = () => {
        setSearch()
        handleOpen(false)
    }

    useOnClickOutside([menuRef, dropdownRef], clickOutside, [
        menuRef,
        dropdownRef,
        clickOutside
    ])

    const makePlaceholder = useMemo(
        () =>
            value.length && !open
                ? `${value.length} ${labelSelecteds}`
                : open
                ? t('global.filter')
                : placeholder,
        [value, open, placeholder]
    )

    const suffixIcon = useMemo(
        () =>
            open && value.length ? (
                <Badge count={value.length} />
            ) : open ? (
                undefined
            ) : (
                <ESEvaIcon name='plus-outline' onClick={onFocus} />
            ),
        [value, open]
    )

    return (
        <ESCard className={classes}>
            <div className='es-card-select-filter__content'>
                <ESDropdown
                    trigger={['click']}
                    overlayClassName='es-card-select-filter__overlay'
                    visible={open}
                    getPopupContainer={() => dropdownRef && dropdownRef.current}
                    overlay={
                        <ESCardSelectFilterMenu
                            ref={menuRef}
                            {...{
                                items,
                                value,
                                handleSelectAll,
                                handleClear,
                                handleClose,
                                handleChange,
                                search,
                                width:
                                    dropdownRef.current &&
                                    dropdownRef.current.offsetWidth
                            }}
                        />
                    }
                >
                    <span style={{ width: '100%' }} ref={dropdownRef}>
                        <ESInput
                            disabled={disabled}
                            onFocus={onFocus}
                            placeholder={makePlaceholder}
                            prefix={open && <ESEvaIcon name='search-outline' />}
                            suffix={suffixIcon}
                            onChange={handleSearch}
                            value={search}
                        />
                    </span>
                </ESDropdown>
                <img
                    src={image}
                    className='es-card-select-filter__content--img'
                    onLoad={() => setLoadImage(false)}
                    style={{ display: loadImage ? 'none' : 'block' }}
                />
                <ESSkeleton
                    className='mt-md mb-xs'
                    loading={loadImage}
                    avatar={{ size: 168 }}
                    paragraph={false}
                    title={false}
                />
            </div>
            <div className={classesFooter}>
                <ESEvaIcon name='checkmark-circle-2' />
                <ESTypography variant='body1' strong>
                    {filterName}
                </ESTypography>
            </div>
        </ESCard>
    )
}

ESCardSelectFilter.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    image: PropTypes.string,
    filterName: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onSelectItem: PropTypes.func,
    onDeselectItem: PropTypes.func,
    onSelectAll: PropTypes.func,
    onClear: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ),
    defaultSelectedItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ),
    labelSelecteds: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    disabled: PropTypes.bool
}
ESCardSelectFilter.defaultProps = {}

export default ESCardSelectFilter
