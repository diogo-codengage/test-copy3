import React from 'react'

import ESLessonHeader, {
    ESLessonHeaderExtra
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESRate from 'sanar-ui/dist/Components/Atoms/Rate'

const renderTabBar = ({ rate, label, title, subtitle }) => (
    props,
    DefaultTabBar
) => (
    <ESLessonHeader
        leftChildren={
            <>
                <ESTypography ellipsis level={5}>
                    {title}
                </ESTypography>
                <div className='subtitle'>
                    <ESTypography
                        variant='subtitle2'
                        className='subtitle__path'
                        ellipsis
                    >
                        {subtitle}
                    </ESTypography>
                    <ESTypography
                        variant='subtitle2'
                        className='subtitle__rate'
                    >
                        {label}
                    </ESTypography>
                    <ESRate {...rate} />
                </div>
            </>
        }
        rightChildren={
            <ESLessonHeaderExtra
                previousLesson='Anterior'
                nextLesson='Próxima'
            />
        }
    >
        <DefaultTabBar {...props} style={{ background: 'none' }} />
    </ESLessonHeader>
)

export default renderTabBar
