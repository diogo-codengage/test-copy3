import React from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

import {
    GET_LAST_ACCESSED,
    ILastAccessed
} from 'Apollo/Course/Queries/last-accessed'
import {
    GET_NEXT_CONTENT,
    INextContent
} from 'Apollo/Course/Queries/next-content'
import { IType } from 'Apollo/Course/Queries/course'

import FLXBanner from 'Components/Banner'
import {
    SANTypography,
    SANBox,
    SANLayoutContainer,
    SANCardCourseModule,
    SANRow,
    SANCol,
    SANQuery
} from '@sanar/components'

// Images
import document from 'Assets/images/resources/document.png'
import question from 'Assets/images/resources/question.png'
import flowchart from 'Assets/images/resources/flowchart.png'
import mentalmap from 'Assets/images/resources/mentalmap.png'
import article from 'Assets/images/resources/article.png'
import baseQuestions from 'Assets/images/banners/base-questions.png'

type IResourceType = 'Document' | 'Video' | 'Question'

const resources = {
    Document: 'documento',
    Video: 'video',
    Question: 'questao'
}

const FLXCourseNavigation: React.FC<RouteComponentProps<{ id: string }>> = ({
    history,
    match: {
        params: { id: courseId }
    }
}) => {
    const { t } = useTranslation('sanarflix')

    const configureImage = (
        image: string,
        type?: IType,
        resourceType?: IResourceType
    ): string => {
        switch (resourceType) {
            case 'Video':
                return image || ''
            case 'Document':
                switch (type) {
                    case 'flowchart':
                        return flowchart
                    case 'mentalmap':
                        return mentalmap
                    case 'article':
                        return article
                    default:
                        return document
                }
            case 'Question':
                return question
            default:
                return image
        }
    }

    const redirectTo = (themeId, resourceType, resourceId) =>
        history.push(
            `/portal/sala-aula/${courseId}/${themeId}/${resources[resourceType]}/${resourceId}`
        )

    return (
        <SANBox
            pb={8}
            pt={8}
            borderBottom='1px solid'
            borderBottomColor='grey.0'
            backgroundColor='grey.0'
        >
            <SANLayoutContainer>
                <SANRow gutter={24} type='flex'>
                    <SANQuery
                        query={GET_LAST_ACCESSED}
                        options={{
                            variables: { courseId },
                            fetchPolicy: 'cache-and-network'
                        }}
                        loaderProps={{
                            style: {
                                height: '100%',
                                minHeight: 200,
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }}
                    >
                        {({
                            data: { lastAccessed }
                        }: {
                            data: { lastAccessed: ILastAccessed }
                        }) => {
                            return (
                                <SANCol xs={24} sm={12}>
                                    <SANTypography
                                        mb={6}
                                        color='grey.7'
                                        level={5}
                                        strong
                                    >
                                        {t('course.continue')}
                                    </SANTypography>
                                    <SANCardCourseModule
                                        data-testid='last-accessed-content'
                                        image={configureImage(
                                            lastAccessed.thumbnail,
                                            lastAccessed.type,
                                            lastAccessed.resource_type
                                        )}
                                        title={lastAccessed.theme_title}
                                        moduleName={t(
                                            `global.resourceTypes.${lastAccessed.resource_type.toLocaleLowerCase()}`
                                        )}
                                        onClick={() =>
                                            redirectTo(
                                                lastAccessed.theme_id,
                                                lastAccessed.resource_type,
                                                lastAccessed.resource_id
                                            )
                                        }
                                        mb={{ _: 6, sm: 0 }}
                                    />
                                </SANCol>
                            )
                        }}
                    </SANQuery>
                    <SANQuery
                        query={GET_NEXT_CONTENT}
                        options={{
                            variables: { courseId },
                            fetchPolicy: 'cache-and-network'
                        }}
                        loaderProps={{
                            style: {
                                height: '100%',
                                minHeight: 200,
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }}
                    >
                        {({
                            data: { nextContent }
                        }: {
                            data: { nextContent: INextContent }
                        }) => {
                            return (
                                <SANCol xs={24} sm={12}>
                                    <SANTypography
                                        mb={6}
                                        color='grey.7'
                                        level={5}
                                        strong
                                    >
                                        {t('course.itemSuggest')}
                                    </SANTypography>
                                    {nextContent ? (
                                        <SANCardCourseModule
                                            data-testid='next-suggested-content'
                                            image={configureImage(
                                                nextContent.thumbnail,
                                                nextContent.type,
                                                nextContent.resource_type
                                            )}
                                            title={nextContent.theme_title}
                                            moduleName={t(
                                                `global.resourceTypes.${nextContent.resource_type.toLocaleLowerCase()}`
                                            )}
                                            onClick={() =>
                                                redirectTo(
                                                    nextContent.theme_id,
                                                    nextContent.resource_type,
                                                    nextContent.resource_id
                                                )
                                            }
                                            mb={{ _: 6, sm: 0 }}
                                        />
                                    ) : (
                                        <FLXBanner
                                            BannerProps={{
                                                title: t(
                                                    'course.banners.questionsBase.title'
                                                ),
                                                image: baseQuestions,
                                                ButtonProps: {
                                                    'data-testid':
                                                        'suggested-item-question',
                                                    children: t(
                                                        'course.banners.questionsBase.action'
                                                    ),
                                                    onClick: () =>
                                                        history.push(
                                                            '/portal/banco-questoes/filtro'
                                                        )
                                                }
                                            }}
                                        />
                                    )}
                                </SANCol>
                            )
                        }}
                    </SANQuery>
                </SANRow>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(FLXCourseNavigation)
