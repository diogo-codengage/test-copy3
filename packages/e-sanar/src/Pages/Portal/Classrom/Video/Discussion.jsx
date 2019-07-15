import React from 'react'

import ESCommentList from 'sanar-ui/dist/Components/Organisms/CommentList'
import ESTextEditor from 'sanar-ui/dist/Components/Molecules/TextEditor'

import { useAuthContext } from 'Hooks/auth'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const comments = {
    count: 5,
    data: [
        {
            text:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at pharetra ipsum. Suspendisse potenti. Nullam tincidunt finibus dolor vitae vulputate. Quisque sapien odio, tempus auctor ex ac, varius cursus neque. Proin nec nisl id mauris feugiat porttitor. Nam iaculis dolor convallis nunc scelerisque laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc egestas tortor nec finibus pretium. Duis nec pulvinar metus. In ullamcorper elit in nunc aliquet, quis tempor nibh scelerisque. Curabitur leo magna, lobortis at ullamcorper et, volutpat sit amet felis.</p>',
            user: {
                name: 'Diogo Biz',
                profile_picture:
                    'https://cdn-images-1.medium.com/fit/c/200/200/0*XlT1iL_rE4s6_sa2.jpg'
            },
            parent_id: null,
            resource_id: '5d1cbe65f8f797001dc64ffd',
            resource_type: 'Question',
            id: '1',
            time: '2019-07-08T14:42:42.884Z',
            likes_count: 7,
            dislikes_count: 1,
            replies_count: 2,
            answers: [
                {
                    text: 'resposta de um comentario',
                    user: {
                        name: 'Pedro Silva'
                    },
                    parent_id: '1',
                    resource_id: '5d1cbe65f8f797001dc64ffd',
                    resource_type: 'Question',
                    id: '5d2647f2d8320c008bf3b141',
                    time: '2019-07-10T20:17:54.337Z',
                    likes_count: 7,
                    dislikes_count: 1
                },
                {
                    text: 'resposta de um comentario de um comentario',
                    owner: 'Pedro Silva',
                    user: {
                        name: 'Joana dark'
                    },
                    parent_id: '1',
                    resource_id: '5d1cbe65f8f797001dc64ffd',
                    resource_type: 'Question',
                    id: '5d2647f2d8320c008bf3b141',
                    time: '2019-07-10T20:17:54.337Z',
                    likes_count: 7,
                    dislikes_count: 1
                }
            ]
        },
        {
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at pharetra ipsum. Suspendisse potenti. Nullam tincidunt finibus dolor vitae vulputate. Quisque sapien odio, tempus auctor ex ac, varius cursus neque. Proin nec nisl id mauris feugiat porttitor. Nam iaculis dolor convallis nunc scelerisque laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc egestas tortor nec finibus pretium. Duis nec pulvinar metus. In ullamcorper elit in nunc aliquet, quis tempor nibh scelerisque. Curabitur leo magna, lobortis at ullamcorper et, volutpat sit amet felis.',
            user: {
                name: 'Batman'
            },
            parent_id: null,
            resource_id: '5d1cc10ff8f797001dc655eb',
            resource_type: 'Question',
            id: '2',
            time: '2019-07-08T14:49:40.200Z',
            likes_count: 7,
            dislikes_count: 1,
            replies_count: 3
        },
        {
            text: 'estou comentando esse video em caráter de teste :)',
            user: {
                name: 'Superman'
            },
            parent_id: null,
            resource_id: '5d1d14eaca4ed4002f18097a',
            resource_type: 'Video',
            id: '3',
            time: '2019-07-10T16:54:38.227Z',
            likes_count: 7,
            dislikes_count: 1,
            replies_count: 3
        },
        {
            text: 'testando',
            user: {
                name: 'Ronaldo'
            },
            parent_id: null,
            resource_id: '5d1d14eaca4ed4002f18097a',
            resource_type: 'Video',
            id: '4',
            time: '2019-07-11T14:54:49.084Z',
            likes_count: 7,
            dislikes_count: 1,
            replies_count: 3
        },
        {
            text: 'Comentario do diogo',
            user: {
                name: 'José'
            },
            parent_id: null,
            resource_id: '5d1cbac6f8f797001dc64b92',
            resource_type: 'Video',
            id: '5',
            time: '2019-07-11T16:34:59.943Z',
            likes_count: 7,
            dislikes_count: 1,
            replies_count: 3,
            monitor: true
        }
    ]
}

const SANClassroomVideo = () => {
    const { me } = useAuthContext()

    return (
        <SANPortalPagesContainer className='classroom__video-discussion'>
            <ESTextEditor
                dark
                avatar={me.profile_picture}
                comment
                onCancel={console.log('onCancel')}
                onSubmit={console.log('onSubmit')}
                className='mb-xl'
            />
            <ESCommentList
                comments={comments}
                onExclude={console.log('onExclude')}
                onReport={console.log('onReport')}
                onComment={console.log('onComment')}
                onOrderBy={console.log('onOrderBy')}
                loadRepliesProps={{
                    onClick: console.log('loadRepliesProps')
                }}
                hideRepliesProps={{
                    onClick: console.log('hideRepliesProps')
                }}
                loadMoreProps={{
                    onClick: console.log('loadMoreProps')
                }}
                hasMore
            />
        </SANPortalPagesContainer>
    )
}

export default SANClassroomVideo
