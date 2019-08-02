import React from 'react'
import classNames from 'classnames'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import {
    ESRadioGroup,
    ESRadioButton
} from 'sanar-ui/dist/Components/Atoms/Radio'
import { useBookmarksContext } from '../Context'

const intlPath = 'bookmark.subHeader.'

const SANBookmarkSubHeader = () => {
    const { t } = useTranslation('esanar')
    const {
        orientation,
        setOrientation,
        setFilter,
        total
    } = useBookmarksContext()

    const gridButtonClasses = classNames({
        'san-bookmark-page__subheader--active-orientation-button':
            orientation === 'grid'
    })

    const listButtonClasses = classNames({
        'san-bookmark-page__subheader--active-orientation-button':
            orientation === 'list'
    })

    return (
        <ESRow
            className='san-bookmark-page__subheader mb-lg'
            type='flex'
            justify='space-between'
            align='middle'
        >
            <ESCol
                xs={24}
                sm={12}
                md={8}
                className='san-bookmark-page__subheader--amount'
            >
                {total > 0 && (
                    <ESTypography variant='body2'>
                        {t(`${intlPath}counter.keyWithCount`, {
                            count: total
                        })}
                    </ESTypography>
                )}
            </ESCol>

            <ESCol xs={24} sm={12} md={8}>
                <ESRadioGroup
                    defaultValue={0}
                    onChange={e => setFilter(e.target.value)}
                    className='d-flex justify-content-between'
                    blocks
                >
                    <ESRadioButton value={0}>
                        {t(`${intlPath}all`)}
                    </ESRadioButton>
                    <ESRadioButton value='Video'>
                        {t(`${intlPath}videos`)}
                    </ESRadioButton>
                    <ESRadioButton value='Document'>
                        {t(`${intlPath}documents`)}
                    </ESRadioButton>
                    <ESRadioButton value='Question'>
                        {t(`${intlPath}questions`)}
                    </ESRadioButton>
                </ESRadioGroup>
            </ESCol>
            <ESCol
                xs={0}
                sm={0}
                md={8}
                className='d-flex justify-content-flex-end'
            >
                <ESButton
                    onClick={() => setOrientation('grid')}
                    size='small'
                    variant='text'
                    circle
                    className={gridButtonClasses}
                >
                    <ESEvaIcon name='grid-outline' />
                </ESButton>
                <ESButton
                    onClick={() => setOrientation('list')}
                    size='small'
                    variant='text'
                    circle
                    className={listButtonClasses}
                >
                    <ESEvaIcon name='list-outline' />
                </ESButton>
            </ESCol>
        </ESRow>
    )
}

SANBookmarkSubHeader.propTypes = {}

export default SANBookmarkSubHeader
