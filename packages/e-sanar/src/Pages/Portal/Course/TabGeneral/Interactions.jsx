import React from 'react'
import { useTranslation } from 'react-i18next'

import ESListView from 'sanar-ui/dist/Components/Atoms/ListView'
import ESQuestionListItem from 'sanar-ui/dist/Components/Molecules/QuestionListItem'
import ESRecentSavedListItem from 'sanar-ui/dist/Components/Molecules/RecentSavedListItem'
import ESCard from 'sanar-ui/dist/Components/Molecules/Card'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESBadge from 'sanar-ui/dist/Components/Atoms/Badge'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useAuthContext } from 'Hooks/auth.js'
import { differenceInDays } from 'date-fns'

//assets
import book from 'assets/images/book.svg'
import video from 'assets/images/video.svg'

const SANInteractions = () => {
    const { t } = useTranslation()

    const {
        me: { id: idLoggedUser },
        getEnrollment
    } = useAuthContext()

    const {
        course: { comments },
        bookmarks
    } = getEnrollment()

    const calcDiffDays = date => {
        const diff = differenceInDays(new Date(), date)
        return t('courseDetails.recentCommentsDays', { days: diff })
    }

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

    return (
        <SANPortalPagesContainer>
            <ESRow type='flex' className='interactions' gutter={24}>
                <ESCol
                    xs={24}
                    sm={24}
                    md={12}
                    alignSelf='stretch'
                    className='interactions__column'
                >
                    <ESSessionTitle
                        title={t('courseDetails.recentCommentsTitle')}
                        subtitle={t('courseDetails.recentCommentsSubtitle')}
                    />
                    <ESCard
                        actions={[
                            <ESButton
                                variant='text'
                                color='primary'
                                size='xsmall'
                                bold
                                uppercase
                                style={{ margin: '0 auto' }}
                            >
                                {t('courseDetails.recentCommentsButton')}
                                <ESBadge count={comments.count} />
                            </ESButton>
                        ]}
                    >
                        <ESListView>
                            {comments.data.map(
                                (comment, index) =>
                                    index < 2 && (
                                        <ESQuestionListItem
                                            key={index}
                                            avatar={
                                                comment.user.profile_picture
                                            }
                                            title={comment.text}
                                            author={comment.user.name}
                                            responses={comment.answers}
                                            interactionTime={calcDiffDays(
                                                comment.created_at
                                            )}
                                            badgeInfo={t('global.you')}
                                            userIsAuthor={
                                                comment.user.id === idLoggedUser
                                            }
                                        />
                                    )
                            )}
                        </ESListView>
                    </ESCard>
                </ESCol>
                <ESCol
                    xs={24}
                    sm={24}
                    md={12}
                    alignSelf='stretch'
                    className='interactions__column'
                >
                    <ESSessionTitle
                        title={t('courseDetails.recentlySavedTitle')}
                        subtitle={t('courseDetails.recentlySavedSubtitle')}
                    />
                    <ESCard
                        actions={[
                            <ESButton
                                variant='text'
                                color='primary'
                                size='xsmall'
                                bold
                                uppercase
                                style={{ margin: '0 auto' }}
                            >
                                {t('courseDetails.recentlySavedButton')}
                                <ESBadge count={bookmarks.count} />
                            </ESButton>
                        ]}
                    >
                        <ESListView>
                            {bookmarks.data.map(
                                (bookmark, index) =>
                                    index <= 1 && (
                                        <ESRecentSavedListItem
                                            key={index}
                                            avatar={bookmarkAvatar(
                                                bookmark.resource_type
                                            )}
                                            title={bookmark.resource.title}
                                            description={bookmark.resource.path}
                                        />
                                    )
                            )}
                        </ESListView>
                    </ESCard>
                </ESCol>
            </ESRow>
        </SANPortalPagesContainer>
    )
}

export default SANInteractions
