import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars'
import { Empty, Skeleton } from 'antd'

import ESInput from '../../Atoms/Input'
import ESCheckbox from '../../Atoms/Checkbox'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESDropdown from '../../Atoms/Dropdown'
import ESButton from '../../Atoms/Button'
import ESDivider from '../../Atoms/Divider'
import ESTypography from '../../Atoms/Typography'
import ESCard from '../Card'

const Badge = ({ count, ...props }) => (
    <div className='badge' {...props}>
        {count > 99 ? '99+' : count}
    </div>
)

const Items = ({
    items,
    value,
    handleSelectAll,
    handleClear,
    handleChange,
    search,
    width = 426
}) => {
    const { t } = useTranslation('sanarui')

    const onChange = item => e => handleChange(item, e)

    const checkValue = item => val => val.value === item.value

    const filtered = search
        ? items.filter(item =>
              item.label.toLowerCase().match(search.toLowerCase())
          )
        : items

    const rows = filtered.map(item => (
        <ESCheckbox
            key={item.value}
            onChange={onChange(item)}
            checked={!!value.find(checkValue(item))}
            className='es-card-select-filter__menu__items--item'
        >
            {item.label}
        </ESCheckbox>
    ))

    return (
        <ESCard className='es-card-select-filter__menu' tabIndex={1}>
            <div className='es-card-select-filter__menu--buttons'>
                <ESButton
                    onClick={handleSelectAll(filtered)}
                    bold
                    variant='text'
                    size='xsmall'
                    className='mr-sm'
                >
                    {t('cardSelectFilter.selectAll')}
                </ESButton>
                <ESButton
                    onClick={handleClear}
                    bold
                    variant='text'
                    size='xsmall'
                    disabled={!value.length}
                >
                    {t('cardSelectFilter.clearSelect')}
                </ESButton>
            </div>
            <ESDivider />
            <Scrollbars autoHeight autoHeightMax={198} style={{ width }}>
                <div className='es-card-select-filter__menu__items'>
                    {rows.length ? (
                        rows
                    ) : (
                        <Empty className='mt-md' style={{ height: 206 }} />
                    )}
                </div>
            </Scrollbars>
        </ESCard>
    )
}

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
    value = []
}) => {
    const dropdownRef = useRef()
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

    const makePlaceholder =
        value.length && !open
            ? `${value.length} ${labelSelecteds}`
            : open
            ? t('global.filter')
            : placeholder

    const suffixIcon =
        open && value.length ? (
            <Badge count={value.length} />
        ) : open ? (
            undefined
        ) : (
            <ESEvaIcon name='plus-outline' />
        )

    return (
        <ESCard className={classes}>
            <div className='es-card-select-filter__content'>
                <ESDropdown
                    trigger={['click']}
                    overlayClassName='es-card-select-filter__overlay'
                    visible={open}
                    onVisibleChange={handleOpen}
                    overlay={
                        <Items
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
                <Skeleton
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
    labelSelecteds: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}
ESCardSelectFilter.defaultProps = {}

export default ESCardSelectFilter
