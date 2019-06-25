import React from 'react'

import ESLessonHeader, {
    ESLessonHeaderExtra,
    ESLessonHeaderLeft
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'

const renderTabBar = ({ rate, title, subtitle }) => (props, DefaultTabBar) => (
    <ESLessonHeader
        rate={rate}
        onBookmarked={() => alert('onBookmarked')}
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
                previousLesson='Anterior'
                nextLesson='Próxima'
                onPrevious={() => alert('onPrevious')}
                onNext={() => alert('onNext')}
            />
        }
    >
        <DefaultTabBar {...props} style={{ background: 'none' }} />
    </ESLessonHeader>
)

export default renderTabBar
