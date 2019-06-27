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
    handleBookmark,
    onClick
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
                onClick={onClick}
            />
        }
        rightChildren={
            <ESLessonHeaderExtra
                previousLesson={prevResource}
                nextLesson={nextResource}
                onPrev={onPrev}
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
