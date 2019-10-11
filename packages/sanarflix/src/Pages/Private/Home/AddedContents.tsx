import React from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

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

const resourceTypes = {
    Video: 'video',
    Quiz: 'questoes',
    Document: 'documento'
}

const renderContent = history => (content: IContent) => (
    <div key={content.id}>
        <SANCardCourseModule
            title={content.title}
            moduleName={i18n.t(`sanarflix:global.types.${content.type}`)}
            actionName={i18n.t('sanarflix:global.access')}
            type={content.type}
            resourceType={content.resource_type}
            image={content.thumbnail}
            size='small'
            newBadge
            onClick={() => {
                const { theme, resource_type, resource_id } = content
                history.push(
                    `/portal/sala-aula/${theme.course.id}/${theme.id}/${
                        resourceTypes[resource_type]
                    }/${resource_id}`
                )
            }}
        />
    </div>
)

const FLXAddedContents = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANQuery
            query={GET_CONTENTS_LAST_ADDED}
            loaderProps={{ minHeight: 186, flex: true }}
        >
            {({ data }: { data: IContents }) => {
                if (!data.lastAddedContents.data.length) {
                    return null
                }
                return (
                    <>
                        <SANLayoutContainer>
                            <SANSessionTitle
                                title={t('home.addedContents.title')}
                                subtitle={t('home.addedContents.subtitle')}
                            />
                        </SANLayoutContainer>
                        <SANLayoutContainer mb={8} fullMobile>
                            <SANCarousel
                                slidesToShow={4}
                                slidesToScroll={1}
                                initialSlide={0}
                                arrows
                                infinite={false}
                                dots={false}
                                draggable
                                lazyLoad
                                swipeToSlide
                                responsive={responsive(
                                    data.lastAddedContents.data.length
                                )}
                            >
                                {data.lastAddedContents.data.map(
                                    renderContent(history)
                                )}
                            </SANCarousel>
                        </SANLayoutContainer>
                    </>
                )
            }}
        </SANQuery>
    )
}

export default withRouter(FLXAddedContents)
