import React from 'react'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import classNames from 'classnames'

const intlPath = 'bookmark.subHeader.'

const SANBookmarkSubHeader = ({
    amount,
    visualization,
    filter,
    onSelectFilter,
    onSelectVisualization
}) => {
    const { t } = useTranslation('esanar')

    const selectedClasses = idx =>
        classNames('san-bookmark-page__subheader--filter-area_item', {
            ['selected-filter']: idx === filter
        })

    const selectedVisualizationClasses = idx =>
        classNames('san-bookmark-page__subheader--visualization_item', {
            ['selected-visualization']: idx === visualization
        })

    const FilterItem = ({ name }) => (
        <div
            className={selectedClasses(name)}
            onClick={() => onSelectFilter(name)}
        >
            <ESTypography variant='body2' strong>
                {t(`${intlPath}${name}`)}
            </ESTypography>
        </div>
    )

    return (
        <div className='san-bookmark-page__subheader'>
            {amount && (
                <ESTypography variant='body2'>
                    {amount}
                    {t(`${intlPath}${amount > 1 ? 'plural' : 'single'}`)}
                </ESTypography>
            )}
            <div className='san-bookmark-page__subheader--filter-area'>
                <FilterItem
                    name='all'
                    onSelect={onSelectFilter}
                    classes={selectedClasses}
                />
                <FilterItem
                    name='videos'
                    onSelect={onSelectFilter}
                    classes={selectedClasses}
                />
                <FilterItem
                    name='documents'
                    onSelect={onSelectFilter}
                    classes={selectedClasses}
                />
                <FilterItem
                    name='questions'
                    onSelect={onSelectFilter}
                    classes={selectedClasses}
                />
            </div>
            <div className='san-bookmark-page__subheader--visualization'>
                <div
                    className={selectedVisualizationClasses('grid')}
                    style={{ marginRight: 12 }}
                    onClick={() => onSelectVisualization('grid')}
                >
                    <ESEvaIcon name='grid-outline' />
                </div>
                <div
                    className={selectedVisualizationClasses('list')}
                    onClick={() => onSelectVisualization('list')}
                >
                    <ESEvaIcon name='list-outline' />
                </div>
            </div>
        </div>
    )
}

SANBookmarkSubHeader.propTypes = {
    amount: PropTypes.number,
    visualization: PropTypes.string,
    filter: PropTypes.string
}

export default SANBookmarkSubHeader
