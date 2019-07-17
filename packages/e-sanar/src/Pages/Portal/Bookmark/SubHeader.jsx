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
    filter,
    loading,
    visualization,
    onSelectFilter,
    onSelectVisualization
}) => {
    const { t } = useTranslation('esanar')

    const selectedClasses = idx =>
        classNames('san-bookmark-page__subheader--filter-area_item', {
            ['selected-filter']: idx === filter,
            ['disabled']: loading
        })

    const selectedVisualizationClasses = idx =>
        classNames('san-bookmark-page__subheader--visualization_item', {
            ['selected-visualization']: idx === visualization
        })

    const pathToMessage = name => (name ? name.toLowerCase() + 's' : 'all')

    const FilterItem = ({ name }) => (
        <div
            className={selectedClasses(name)}
            onClick={() => !loading && onSelectFilter(name)}
        >
            <ESTypography variant='body2' strong>
                {t(`${intlPath}${pathToMessage(name)}`)}
            </ESTypography>
        </div>
    )

    return (
        <ESRow
            type='flex'
            align='middle'
            style={{ marginBottom: 40, height: 40 }}
        >
            <ESCol sm={24} md={6}>
                {amount > 0 && (
                    <div
                        style={{
                            height: 40,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ESTypography variant='body2'>
                            {amount}
                            {t(
                                `${intlPath}${amount > 1 ? 'plural' : 'single'}`
                            )}
                        </ESTypography>
                    </div>
                )}
            </ESCol>
            <ESCol sm={24} md={12}>
                <ESRow type='flex' align='middle' justify='space-between'>
                    <ESCol span={6}>
                        <FilterItem
                            name={null}
                            onSelect={onSelectFilter}
                            classes={selectedClasses}
                        />
                    </ESCol>
                    <ESCol span={6}>
                        <FilterItem
                            name='Video'
                            onSelect={onSelectFilter}
                            classes={selectedClasses}
                        />
                    </ESCol>
                    <ESCol span={6}>
                        <FilterItem
                            name='Document'
                            onSelect={onSelectFilter}
                            classes={selectedClasses}
                        />
                    </ESCol>
                    <ESCol span={6}>
                        <FilterItem
                            name='Question'
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
                        onClick={() =>
                            !loading && onSelectVisualization('grid')
                        }
                    >
                        <ESEvaIcon name='grid-outline' />
                    </div>
                    <div
                        className={selectedVisualizationClasses('list')}
                        onClick={() =>
                            !loading && onSelectVisualization('list')
                        }
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
    filter: PropTypes.string,
    loading: PropTypes.bool,
    visualization: PropTypes.string
}

export default SANBookmarkSubHeader
