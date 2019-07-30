import React from 'react'
import { useTranslation } from 'react-i18next'

import ESListView from 'sanar-ui/dist/Components/Atoms/ListView'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'
import ESRecentSavedListItem from 'sanar-ui/dist/Components/Molecules/RecentSavedListItem'
import ESMissContent from 'sanar-ui/dist/Components/Molecules/MissContent'
import ESCard from 'sanar-ui/dist/Components/Molecules/Card'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'

import { Query } from 'react-apollo'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useAuthContext } from 'Hooks/auth.js'
import { GET_BOOKMARKS } from 'Apollo/Bookmark/queries/bookmarks'

//assets
import book from 'assets/images/book.svg'
import video from 'assets/images/video.svg'
import noBookmark from 'assets/images/empty-bookmark.svg'

const SANInteractions = () => {
    const { t } = useTranslation('esanar')

    const { getEnrollment } = useAuthContext()

    const bookmarkAvatar = status => {
        switch (status) {
            case 'Question':
                return book
            case 'Video':
                return video
            case 'Complement':
                return ''
            default:
                return ''
        }
    }

    const renderListBookmarks = (item, index) => (
        <ESRecentSavedListItem
            key={index}
            avatar={bookmarkAvatar(item.resource_type)}
            title={item.resource_title}
            description={
                item.resource_index && item.level_index
                    ? t('courseDetails.recentlySavedContentIndexes', {
                          module: item.level_index,
                          class: item.resource_index
                      })
                    : ''
            }
        />
    )

    return (
        <SANPortalPagesContainer>
            <ESSessionTitle
                title={t('courseDetails.recentlySavedTitle')}
                subtitle={t('courseDetails.recentlySavedSubtitle')}
            />
            <Query
                query={GET_BOOKMARKS}
                variables={{
                    enrollmentId: getEnrollment().id,
                    limit: 2,
                    skip: 0
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <ESSpin
                                className='w-100 d-flex justify-content-center align-items-center'
                                style={{ height: 243 }}
                            />
                        )
                    }
                    if (error) {
                        return (
                            <SANErrorPiece
                                message={t('courseDetails.errorRecentlySaved')}
                            />
                        )
                    }

                    return (
                        <ESCard
                            className='mb-md'
                            actions={
                                data.bookmarks &&
                                data.bookmarks.count > 0 && [
                                    <ESButton
                                        variant='text'
                                        color='primary'
                                        size='xsmall'
                                        bold
                                        uppercase
                                        style={{ margin: '0 auto' }}
                                    >
                                        {t('courseDetails.recentlySavedButton')}
                                    </ESButton>
                                ]
                            }
                        >
                            <ESListView
                                dataSource={data.bookmarks.data}
                                renderItem={renderListBookmarks}
                                locale={{
                                    emptyText: (
                                        <ESMissContent
                                            className='interactions__miss-content'
                                            text={t(
                                                'courseDetails.recentlySavedNoItems'
                                            )}
                                            buttonText={t(
                                                'courseDetails.recentlySavedNoItemsAction'
                                            )}
                                            image={noBookmark}
                                            fullSpace
                                        />
                                    )
                                }}
                            >
                                {!data.bookmarks ||
                                    (data.bookmarks.count === 1 && (
                                        <ESMissContent
                                            className='interactions__miss-one-content'
                                            text={t(
                                                'courseDetails.recentlySavedOneItem'
                                            )}
                                            image={noBookmark}
                                        />
                                    ))}
                            </ESListView>
                        </ESCard>
                    )
                }}
            </Query>
        </SANPortalPagesContainer>
    )
}

export default SANInteractions
