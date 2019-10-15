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
    SANSpin,
    SANGenericError
} from '@sanar/components'

import baseQuestions from 'Assets/images/banners/base-questions.png'
import { useApolloClient } from '@apollo/react-hooks'

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
    const client = useApolloClient()

    const [lastAccessed, setLastAccessed] = useState<any>({
        loading: true,
        error: false
    })
    const [nextContent, setNextContent] = useState<any>({
        loading: true,
        error: false
    })

    const redirectTo = (themeId, resourceType, resourceId) =>
        history.push(
            `/portal/sala-aula/${courseId}/${themeId}/${
                resources[resourceType]
            }/${resourceId}`
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
                setLastAccessed({ loading: false, error: true })
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
                setNextContent({ loading: false, error: true })
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
                            {lastAccessed.loading ? (
                                <SANSpin minHeight={178} flex />
                            ) : lastAccessed.error ? (
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
                                </>
                            )}
                        </SANCol>
                    )}

                    <SANCol xs={24} sm={12}>
                        <SANTypography mb={6} color='grey.7' level={5} strong>
                            {t('course.itemSuggest')}
                        </SANTypography>
                        {!nextContent.last_content ? (
                            nextContent.loading ? (
                                <SANSpin minHeight={178} flex />
                            ) : nextContent.error ? (
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
                        )}
                    </SANCol>
                </SANRow>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(FLXCourseNavigation)
