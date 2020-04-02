import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { theme } from 'styled-tools'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANLayoutContainer,
    SANSessionTitle,
    SANInfiniteScroll,
    SANCollapseTheme,
    SANCollapseThemePanel,
    SANStyled,
    SANEmpty,
    SANQuery
} from '@sanar/components'
import { renderClass } from '@sanar/components/dist/Components/Molecules/CollapseTheme'
import i18n from 'sanar-ui/dist/Config/i18n'

import {
    FLXCompletenessFilters,
    ICompletenessFiltersValues
} from 'Components/CompletenessFilters'
import { GET_THEMES, IThemes } from 'Apollo/Course/Queries/themes'
import {
    GET_THEME_CONTENTS,
    IThemeContents
} from 'Apollo/Course/Queries/theme-contents'

import classSvg from 'Assets/images/contents/class.svg'
import flowSvg from 'Assets/images/contents/flow.svg'
import mentalMapSvg from 'Assets/images/contents/mental-map.svg'
import questionSvg from 'Assets/images/contents/question.svg'
import resumeSvg from 'Assets/images/contents/resume.svg'

const Img = props => <img {...props} width={26} alt='' />

const typesIcon = {
    resume: <Img src={resumeSvg} />,
    question: <Img src={questionSvg} />,
    mentalmap: <Img src={mentalMapSvg} />,
    flowchart: <Img src={flowSvg} />,
    article: <Img src={resumeSvg} />,
    lesson: <Img src={classSvg} />
}

const SANSessionTitleStyled = SANStyled(SANSessionTitle)`
    & > div:nth-child(1) {
        margin-right: ${theme('space.xl')};
    }
    & > div:nth-child(2) {
        display: block;
        flex: inherit;
        margin: 0;
        ${theme('mediaQueries.down.xs')} {
            margin-top: ${theme('space.md')};
        }
    }
`

const updateCacheThemes = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    return Object.assign({}, prev, {
        themes: {
            ...prev.themes,
            data: [...prev.themes.data, ...fetchMoreResult.themes.data]
        }
    })
}

const renderTheme = (history, courseId, courseName) => (theme, index) => {
    const trackContentClicked = (content) => {
        window.analytics.track('Content Viewed', {
            courseName,
            contentType: content.type,
            content: content.title,
            contentId: content.resource_id
        })
    }

    return (
        <SANCollapseThemePanel
            customKey={theme.id}
            index={index}
            title={theme.name}
            data-testid={`theme-${theme.name}`}
        >
            <SANQuery
                query={GET_THEME_CONTENTS}
                options={{
                    variables: { themeId: theme.id, courseId },
                    fetchPolicy: 'network-only'
                }}
                loaderProps={{ minHeight: 70, flex: true }}
            >
                {({ data: { themeContents } }: { data: IThemeContents }) =>
                    !!themeContents.data && themeContents.data.length ? (
                        themeContents.data.map(content =>
                            renderClass({
                                themeId: theme.id,
                                resourceType: content.resource_type,
                                id: content.id,
                                title: content.title,
                                subtitle: i18n.t(
                                    `sanarflix:global.types.${content.type}`
                                ),
                                icon: typesIcon[content.type],
                                checked: content.completed,
                                onClick: ({ themeId, resourceType }) => {
                                    trackContentClicked(content)
                                    history.push(
                                        `/portal/sala-aula/${theme.course.id}/${themeId}/${resourceType}/${content.resource_id}`
                                    )
                                }
                            })
                        )
                    ) : (
                        <SANEmpty p='md' hasTitle={false} />
                    )
                }
            </SANQuery>
        </SANCollapseThemePanel>
    )
}

const Themes = ({
                    courseId,
                    courseName,
                    history
                }: RouteComponentProps & { courseId: string, courseName: string }) => {
    const { t } = useTranslation('sanarflix')
    const [count, setCount] = useState(0)
    const [completenessFilter, setCompletenessFilter] = useState<
        ICompletenessFiltersValues
        >('all')

    const onChangeCompletenessFilters = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => setCompletenessFilter(e.target.value as ICompletenessFiltersValues)

    return (
        <>
            <SANLayoutContainer pt={7} pb={7}>
                <SANSessionTitleStyled
                    title={t('course.subheader.keyWithCount', {
                        count
                    })}
                    extra={
                        <FLXCompletenessFilters
                            defaultValue='all'
                            value={completenessFilter}
                            onChange={onChangeCompletenessFilters}
                        />
                    }
                    extraOnLeft
                    m='0'
                />
            </SANLayoutContainer>
            <SANQuery
                query={GET_THEMES}
                options={{
                    variables: {
                        courseId,
                        ...(completenessFilter !== 'all' && {
                            completeness: completenessFilter
                        })
                    }
                }}
                loaderProps={{ minHeight: 150, flex: true }}
            >
                {({
                      data: { themes },
                      fetchMore
                  }: {
                    data: IThemes
                    fetchMore: (data: any) => Object
                }) => {
                    setCount(themes.count)
                    return (
                        <SANLayoutContainer pb={8}>
                            {!!themes.data.length ? (
                                <SANInfiniteScroll
                                    threshold={71}
                                    loadMore={() =>
                                        fetchMore({
                                            variables: {
                                                skip: themes.data.length
                                            },
                                            updateQuery: updateCacheThemes
                                        })
                                    }
                                    hasMore={themes.data.length < themes.count}
                                >
                                    <SANCollapseTheme>
                                        {themes.data.map(
                                            renderTheme(history, courseId, courseName)
                                        )}
                                    </SANCollapseTheme>
                                </SANInfiniteScroll>
                            ) : (
                                <SANEmpty />
                            )}
                        </SANLayoutContainer>
                    )
                }}
            </SANQuery>
        </>
    )
}

export default withRouter(Themes)