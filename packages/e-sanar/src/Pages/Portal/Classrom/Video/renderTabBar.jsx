import React from 'react'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'

const renderTabBar = ({
    rate,
    title,
    subtitle,
    nextResource,
    prevResource,
    onPrev,
    onNext,
    bookmarked,
    handleBookmark
}) => (props, DefaultTabBar) => (
    <ESLessonHeader
        rate={rate}
        bookmarked={bookmarked}
        onBookmarked={handleBookmark}
        leftChildren={
            <ESLessonHeaderLeft
                title={title}
                subtitle={subtitle}
                rate={rate}
                onClick={() => alert('open menu')}
            />
        }
        rightChildren={
            <ESLessonHeaderExtra
                previousLesson={prevResource}
                nextLesson={nextResource}
                onPrevious={onPrev}
                onNext={onNext}
                bookmarked={bookmarked}
                onBookmarked={handleBookmark}
            />
        }
    >
        <DefaultTabBar {...props} style={{ background: 'none' }} />
    </ESLessonHeader>
)

export default renderTabBar
