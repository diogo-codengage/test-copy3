import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import SANBookmarkSubHeader from './SubHeader'
import { ESBookmarkList } from 'sanar-ui/dist/Components/Molecules/BookmarkList'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'
import { useBookmarksContext } from '../Context'
import { useAuthContext } from 'Hooks/auth'

const SANBookmarkContent = ({ onRemove }) => {
    const {
        me: { userId }
    } = useAuthContext()
    const { width } = useWindowSize()
    const {
        filter,
        orientation,
        bookmarks,
        loading,
        page,
        setPage,
        total
    } = useBookmarksContext()

    const configureOrientation = useMemo(
        () => (width > 767 && orientation === 'grid' ? 'grid' : 'list'),
        [orientation, width]
    )

    const listData = bookmarks
        ? bookmarks.map(item => {
              return {
                  id: item.id,
                  image: item.resource_thumbnail,
                  title: item.resource_title,
                  resourceType: item.resource_type,
                  subtitle: 'Módulo 1, aula 2'
              }
          })
        : []

    const removeBookmark = (resourceId, resourceType) => {}

    const onPagination = page => {
        setPage(page - 1)
    }

    return (
        <div className='san-bookmark-page'>
            <SANPortalPagesContainer className='d-flex flex-column flex-fill'>
                <SANBookmarkSubHeader
                    amount={total}
                    filter={filter}
                    loading={loading}
                />

                <div className='flex-fill'>
                    <ESBookmarkList
                        orientation={configureOrientation}
                        data={listData}
                        loading={loading}
                        onRemove={onRemove}
                    />
                </div>

                <ESPagination
                    className='text-align-center'
                    current={page + 1}
                    total={total}
                    pageSize={9999}
                    onChange={onPagination}
                />
            </SANPortalPagesContainer>
        </div>
    )
}

SANBookmarkContent.propTypes = {
    bookmarks: PropTypes.array,
    total: PropTypes.number,
    filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    history: PropTypes.any,
    loading: PropTypes.bool,
    page: PropTypes.number,
    orientation: PropTypes.string,
    setFilter: PropTypes.func,
    setPage: PropTypes.func,
    setorientation: PropTypes.func,
    getColumnAmount: PropTypes.func
}

export default SANBookmarkContent
