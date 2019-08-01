import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import SANBookmarksHeader from './Header'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import SANBookmarkSubHeader from './SubHeader'
import { ESBookmarkList } from 'sanar-ui/dist/Components/Molecules/BookmarkList'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'
import { useBookmarksContext } from '../Context'
import { Modal } from 'antd'
const { confirm } = Modal

const SANBookmarkListPage = ({ history }) => {
    const { t } = useTranslation('esanar')
    const { width } = useWindowSize()
    const {
        filter,
        orientation,
        bookmarks,
        loading,
        page,
        setPage,
        total,
        removeBookmark
    } = useBookmarksContext()

    const configureOrientation = useMemo(
        () => (width > 767 && orientation === 'grid' ? 'grid' : 'list'),
        [orientation, width]
    )

    const onRemove = async ({ id, resourceType }) => {
        confirm({
            title: t('bookmark.confirmDelete.title'),
            centered: true,
            okText: t('global.remove'),
            okButtonProps: {
                type: 'danger'
            },
            onOk: () => removeBookmark(id, resourceType)
        })
    }

    const listData = bookmarks
        ? bookmarks.map(item => {
              return {
                  id: item.resource_id,
                  image: item.resource_thumbnail,
                  title: item.resource_title,
                  resourceType: item.resource_type,
                  subtitle: 'Módulo 1, aula 2'
              }
          })
        : []

    const onPagination = page => {
        setPage(page - 1)
    }

    const goToBookmark = item => {
        const index = bookmarks
            .filter(bookmark => bookmark.resource_type === 'Question')
            .findIndex(bookmark => bookmark.resource_id === item.resource_id)
        history.push(`/aluno/favoritos/questoes/${index + 1}`)
    }

    return (
        <div className='san-bookmark-page'>
            <SANBookmarksHeader />
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

                {total > 0 && (
                    <ESPagination
                        className='text-align-center'
                        current={page + 1}
                        total={total}
                        pageSize={9999}
                        onChange={onPagination}
                    />
                )}
            </SANPortalPagesContainer>
        </div>
    )
}

SANBookmarkListPage.propTypes = {}

export default withRouter(SANBookmarkListPage)
