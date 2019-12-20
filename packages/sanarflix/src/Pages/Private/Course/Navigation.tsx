import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

import { GET_LAST_ACCESSED } from 'Apollo/Course/Queries/last-accessed'
import { GET_NEXT_CONTENT } from 'Apollo/Course/Queries/next-content'

import FLXBanner from 'Components/Banner'
import {
    SANTypography,
    SANBox,
    SANLayoutContainer,
    SANCardCourseModule,
    SANRow,
    SANCol,
    SANGenericError
} from '@sanar/components'

import baseQuestions from 'Assets/images/banners/base-questions.png'
import { useApolloClient } from '@apollo/react-hooks'

const resources = {
    Document: 'documento',
    Video: 'video',
    Quiz: 'questoes'
}

const FLXCourseNavigation: React.FC<RouteComponentProps<{ courseId: string }>> = ({
    history,
    match: {
        params: { courseId }
    }
}) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()

    const [lastAccessed, setLastAccessed] = useState<any>(null)
    const [nextContent, setNextContent] = useState<any>(null)

    const redirectTo = (themeId, resourceType, resourceId) =>
        history.push(
            `/portal/sala-aula/${courseId}/${themeId}/${resources[resourceType]}/${resourceId}`
        )

    useEffect(() => {
        const getLastAccessed = async () => {
            try {
                const { data } = await client.query({
                    query: GET_LAST_ACCESSED,
                    variables: {
                        courseId
                    },
                    fetchPolicy: 'network-only'
                })

                setLastAccessed(data.lastAccessed)
            } catch (e) {
                setLastAccessed({ error: true })
            }
        }

        const getNextContent = async () => {
            try {
                const { data } = await client.query({
                    query: GET_NEXT_CONTENT,
                    variables: {
                        courseId
                    },
                    fetchPolicy: 'network-only'
                })
                setNextContent(data.nextContent)
            } catch (e) {
                setNextContent({ error: true })
            }
        }

        getNextContent()
        getLastAccessed()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!lastAccessed && !nextContent) return null

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
                    {!lastAccessed ? null : (
                        <SANCol xs={24} sm={12}>
                            <SANTypography
                                mb={6}
                                color='grey.7'
                                level={5}
                                strong
                            >
                                {t('course.continue')}
                            </SANTypography>
                            {lastAccessed.error ? (
                                <SANGenericError mb={3} />
                            ) : (
                                <>
                                    <SANCardCourseModule
                                        data-testid='last-accessed-content'
                                        actionName={t('global.access')}
                                        type={lastAccessed.type}
                                        resourceType={
                                            lastAccessed.resource_type
                                        }
                                        image={lastAccessed.thumbnail}
                                        title={lastAccessed.theme_title}
                                        moduleName={t(
                                            `global.types.${lastAccessed.type}`
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
                                </>
                            )}
                        </SANCol>
                    )}

                    <SANCol xs={24} sm={12}>
                        {nextContent && (
                            <SANTypography
                                mb={6}
                                color='grey.7'
                                level={5}
                                strong
                            >
                                {t('course.itemSuggest')}
                            </SANTypography>
                        )}
                        {nextContent ? (
                            !nextContent.last_content ? (
                                nextContent.error ? (
                                    <SANGenericError mb={3} />
                                ) : (
                                    <SANCardCourseModule
                                        data-testid='next-suggested-content'
                                        actionName={t('global.access')}
                                        type={nextContent.type}
                                        resourceType={nextContent.resource_type}
                                        image={nextContent.thumbnail}
                                        title={nextContent.theme_title}
                                        moduleName={t(
                                            `global.types.${nextContent.type}`
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
                                )
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
                            )
                        ) : null}
                    </SANCol>
                </SANRow>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(FLXCourseNavigation)
