import React from 'react'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import classNames from 'classnames'
import { ESCol, ESRow } from 'sanar-ui/dist/Components/Atoms/Grid'

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
        <ESRow type='flex' align='middle' height={40}>
            <ESCol sm={24} md={6}>
                <div
                    style={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {amount && (
                        <ESTypography variant='body2'>
                            {amount}
                            {t(
                                `${intlPath}${amount > 1 ? 'plural' : 'single'}`
                            )}
                        </ESTypography>
                    )}
                </div>
            </ESCol>
            <ESCol sm={24} md={12}>
                <ESRow type='flex' align='middle' justify='space-between'>
                    <ESCol span={6}>
                        <FilterItem
                            name='all'
                            onSelect={onSelectFilter}
                            classes={selectedClasses}
                        />
                    </ESCol>
                    <ESCol span={6}>
                        <FilterItem
                            name='videos'
                            onSelect={onSelectFilter}
                            classes={selectedClasses}
                        />
                    </ESCol>
                    <ESCol span={6}>
                        <FilterItem
                            name='documents'
                            onSelect={onSelectFilter}
                            classes={selectedClasses}
                        />
                    </ESCol>
                    <ESCol span={6}>
                        <FilterItem
                            name='questions'
                            onSelect={onSelectFilter}
                            classes={selectedClasses}
                        />
                    </ESCol>
                </ESRow>
            </ESCol>
            <ESCol xs={0} sm={0} md={6}>
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
            </ESCol>
        </ESRow>
    )
}

SANBookmarkSubHeader.propTypes = {
    amount: PropTypes.number,
    visualization: PropTypes.string,
    filter: PropTypes.string
}

export default SANBookmarkSubHeader
