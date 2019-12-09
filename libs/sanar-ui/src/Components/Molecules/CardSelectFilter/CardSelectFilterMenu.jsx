import React, {
    useState,
    useRef,
    forwardRef,
    useMemo,
    useCallback
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars'
import { Empty } from 'antd'

import ESCheckbox from '../../Atoms/Checkbox'
import ESButton from '../../Atoms/Button'
import ESDivider from '../../Atoms/Divider'
import ESCard from '../Card'

const ESCardSelectFilterMenu = forwardRef(
    (
        {
            items,
            value,
            handleSelectAll,
            handleClear,
            handleChange,
            search,
            width = 426
        },
        ref
    ) => {
        const { t } = useTranslation('sanarui')

        const onChange = item => e => handleChange(item, e)

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
            <ESCheckbox
                key={item.id}
                onChange={onChange(item)}
                checked={!!value.find(checkValue(item))}
                className='es-card-select-filter__menu__items--item'
            >
                {item.label.toLowerCase()}
            </ESCheckbox>
        ))

        return (
            <div ref={ref}>
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
                    <Scrollbars
                        autoHeight
                        autoHeightMax={198}
                        style={{ width }}
                    >
                        <div className='es-card-select-filter__menu__items'>
                            {rows.length ? (
                                rows
                            ) : (
                                <Empty
                                    className='mt-md'
                                    description={t('cardSelectFilter.noData')}
                                    style={{ height: 174 }}
                                />
                            )}
                        </div>
                    </Scrollbars>
                </ESCard>
            </div>
        )
    }
)

ESCardSelectFilterMenu.propTypes = {
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
ESCardSelectFilterMenu.defaultProps = {}

export default ESCardSelectFilterMenu
