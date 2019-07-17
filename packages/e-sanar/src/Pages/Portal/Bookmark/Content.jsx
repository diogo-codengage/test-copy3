import React from 'react'
import PropTypes from 'prop-types'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import SANBookmarkSubHeader from './SubHeader'
import ESListView from 'sanar-ui/dist/Components/Atoms/ListView'
import { ESBookmarkGridItem } from 'sanar-ui/dist/Components/Molecules/BookmarkGrid'
import { ESBookmarkListItem } from 'sanar-ui/dist/Components/Molecules/BookmarkList'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import { List } from 'antd'

const SANBookmarkContent = ({
    bookmarks,
    total,
    filter,
    loading,
    page,
    visualization,
    getColumnAmount,
    navigateToResource,
    setFilter,
    setPage,
    setVisualization
}) => (
    <div className='san-bookmark-page'>
        <SANPortalPagesContainer>
            <SANBookmarkSubHeader
                amount={total}
                filter={filter}
                loading={loading}
                visualization={visualization}
                onSelectFilter={setFilter}
                onSelectVisualization={setVisualization}
            />

            <ESListView
                grid={getColumnAmount()}
                loading={loading}
                dataSource={bookmarks}
                renderItem={item => {
                    const {
                        id,
                        resource_title,
                        resource_id,
                        level_id,
                        resource_thumbnail,
                        resource_type
                    } = item

                    return (
                        <List.Item
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {visualization && visualization === 'grid' ? (
                                <ESBookmarkGridItem
                                    id={id}
                                    image={resource_thumbnail}
                                    title={resource_title}
                                    resourceType={resource_type}
                                    onPress={() =>
                                        navigateToResource(
                                            resource_type,
                                            level_id,
                                            resource_id
                                        )
                                    }
                                    onRemove={() =>
                                        console.log('remove clicked')
                                    }
                                />
                            ) : (
                                <ESBookmarkListItem
                                    id={id}
                                    image={resource_thumbnail}
                                    title={resource_title}
                                    resourceType={resource_type}
                                    onRemove={() =>
                                        console.log('remove clicked')
                                    }
                                />
                            )}
                        </List.Item>
                    )
                }}
                footer={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <ESPagination
                            total={total}
                            current={page}
                            onChange={setPage}
                        />
                    </div>
                }
            />
        </SANPortalPagesContainer>
    </div>
)

SANBookmarkContent.propTypes = {
    bookmarks: PropTypes.array,
    total: PropTypes.number,
    filter: PropTypes.string,
    history: PropTypes.any,
    loading: PropTypes.bool,
    page: PropTypes.number,
    visualization: PropTypes.string,
    setFilter: PropTypes.func,
    setPage: PropTypes.func,
    setVisualization: PropTypes.func,
    getColumnAmount: PropTypes.func
}

export default SANBookmarkContent
