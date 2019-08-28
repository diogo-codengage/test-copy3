import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANSessionTitle,
    SANCarousel,
    SANCardCourseModule,
    SANLayoutContainer,
    SANQuery
} from '@sanar/components'
import i18n from 'sanar-ui/dist/Config/i18n'

import { responsive } from './ViewedCourses'
import {
    GET_CONTENTS_LAST_ADDED,
    IContents,
    IContent
} from 'Apollo/Home/Queries/contents-last-added'

const renderContent = (content: IContent) => (
    <div key={content.id}>
        <SANCardCourseModule
            title={content.title}
            moduleName='Tipo do item'
            actionName={i18n.t('sanarflix:global.access')}
            image={content.thumbnail}
            size='small'
            newBadge
        />
    </div>
)

const Contents = () => (
    <SANQuery
        query={GET_CONTENTS_LAST_ADDED}
        loaderProps={{ minHeight: 186, flex: true }}
    >
        {({ data }: { data: IContents }) => (
            <SANCarousel
                slidesToShow={4}
                slidesToScroll={1}
                initialSlide={0}
                arrows
                infinite={false}
                dots={false}
                draggable
                lazyLoad
                responsive={responsive}
            >
                {data.lastAddedContents.map(renderContent)}
            </SANCarousel>
        )}
    </SANQuery>
)

const FLXAddedContents = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <>
            <SANLayoutContainer>
                <SANSessionTitle
                    title={t('home.addedContents.title')}
                    subtitle={t('home.addedContents.subtitle')}
                />
            </SANLayoutContainer>
            <SANLayoutContainer mb={8} fullMobile>
                <Contents />
            </SANLayoutContainer>
        </>
    )
}

export default FLXAddedContents
