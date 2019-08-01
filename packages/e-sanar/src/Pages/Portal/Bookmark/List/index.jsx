import React, { useState, useEffect, useCallback } from 'react'
import SANBookmarksHeader from './Header'
import { useApolloContext } from 'Hooks/apollo'
import { GET_BOOKMARKS } from 'Apollo/Bookmark/queries/bookmarks'
import { useAuthContext } from 'Hooks/auth'
import SANBookmarkContent from './Content'
import { CHANGE_BOOKMARK } from 'Apollo/Bookmark/mutations/bookmark'
import { Modal } from 'antd'
import { useBookmarksContext } from '../Context'
const { confirm } = Modal

const SANBookmarkListPage = ({ history }) => {
    const client = useApolloContext()

    // Bookmarks context
    const { filter } = useBookmarksContext()

    const navigateToResource = (resourceType, moduleId, resourceId) => {
        console.log('nav to...')
    }

    const onRemoveConfirm = async (resourceId, resourceType) => {
        confirm({
            title: 'Você quer mesmo remover?',
            content: 'Esta alteração não terá volta.',
            centered: true,
            onOk: () => onRemove(resourceId, resourceType)
        })
    }

    const onRemove = async (resourceId, resourceType) => {
        console.log('remove')
    }

    return (
        <>
            <SANBookmarksHeader />
            <SANBookmarkContent
                navigateToResource={navigateToResource}
                onRemove={onRemoveConfirm}
            />
            {/* {!error ? (

            ) : (
                <ESDefaultError />
            )} */}
        </>
    )
}

export default SANBookmarkListPage
