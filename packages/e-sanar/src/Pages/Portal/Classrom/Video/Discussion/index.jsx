import React from 'react'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import SANCommentCreate from './CommentCreate'
import SANCommentList from './CommentList'

const SANDiscussion = ({ resourceId }) => {
    return (
        <SANPortalPagesContainer className='classroom__video-discussion'>
            <SANCommentCreate resourceId={resourceId} />
            <SANCommentList resourceId={resourceId} />
        </SANPortalPagesContainer>
    )
}

export default SANDiscussion
