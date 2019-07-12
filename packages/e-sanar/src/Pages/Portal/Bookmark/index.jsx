import React, { useState } from 'react'
import SANBookmarksHeader from './Header'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import SANBookmarkSubHeader from './SubHeader'

const SANBookmarkPage = () => {
    const [filter, setFilter] = useState('all')
    const [visualization, setVisualization] = useState('grid')

    return (
        <div className='san-bookmark-page'>
            <SANBookmarksHeader />
            <SANPortalPagesContainer>
                <SANBookmarkSubHeader
                    amount={2}
                    filter={filter}
                    visualization={visualization}
                    onSelectFilter={setFilter}
                    onSelectVisualization={setVisualization}
                />
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANBookmarkPage
