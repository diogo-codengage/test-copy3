import React, { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    GET_GLOBAL_SEARCH,
    IGlobalSearch
} from 'Apollo/Search/Queries/page-global-search'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANHeader,
    SANLayoutContainer,
    SANTypography,
    SANInfiniteScroll,
    SANEmpty,
    SANQuery,
    SANSearchResultList,
    SANSearchResultItem
} from '@sanar/components'

import FLXSearch from 'Components/Search'

import { events } from 'Config/Segment'

const resources = {
    Document: 'documento',
    Video: 'video',
    Question: 'questoes'
}

const updateGlobalSearchCache = (prev: any, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    return Object.assign({}, prev, {
        globalSearch: {
            ...prev.globalSearch,
            count: fetchMoreResult.globalSearch.count,
            data: [
                ...prev.globalSearch.data,
                ...fetchMoreResult.globalSearch.data
            ]
        }
    })
}

const FLXSearchPage = ({ location, history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
    const [currentCount, setCurrentCount] = useState(0)
    const params: any = new URLSearchParams(location.search)

    const goToResource = ({
        resourceId: resource,
        type,
        resourceType,
        course,
        themeId
    }) => {
        const content = {
            resource,
            type,
            course,
            themeId
        }
        if (type.toLowerCase() === 'course') {
            const link = `/portal/curso/${course.id}`
            window.analytics.track(events['Search Result Clicked'].event, {
                link,
                content
            })
            history.push(link)
        } else {
            const link = `/portal/sala-aula/${course.id}/${themeId}/${resources[resourceType]}/${resource}`
            window.analytics.track(events['Search Result Clicked'].event, {
                link,
                content
            })
            history.push(link)
        }
    }

    const handleCompleted = ({ globalSearch }) =>
        setCurrentCount(globalSearch.count)

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <SANBox
            backgroundColor='grey-solid.1'
            displayFlex
            flexDirection='column'
            flex='1'
        >
            <SANHeader
                onBack={() => history.goBack()}
                SessionTitleProps={{
                    title: t('searchResult.title'),
                    subtitle: t('searchResult.subtitle')
                }}
                extra={
                    <FLXSearch initialValue={params.get('pesquisa') || ''} />
                }
            />
            <SANLayoutContainer mt={8} pb={6} style={{ overflow: 'hidden' }}>
                <SANQuery
                    query={GET_GLOBAL_SEARCH}
                    loaderProps={{ flex: true }}
                    options={{
                        variables: {
                            value: params.get('pesquisa'),
                            limit: 20
                        },
                        onCompleted: handleCompleted
                    }}
                >
                    {({
                        data: { globalSearch },
                        fetchMore
                    }: {
                        data: IGlobalSearch
                        fetchMore: (data: any) => Object
                    }) => {
                        const results =
                            globalSearch && !!globalSearch.data.length
                                ? globalSearch.data.map(e => ({
                                      ...e,
                                      image: e.image && e.image.original.url
                                  }))
                                : []
                        return (
                            <>
                                <SANBox mb={7}>
                                    <SANTypography
                                        component='span'
                                        variant='caption2'
                                        strong
                                    >
                                        {(globalSearch && currentCount) || 0}{' '}
                                    </SANTypography>
                                    <SANTypography
                                        component='span'
                                        variant='caption2'
                                    >
                                        {t('global.foundResults')}
                                    </SANTypography>
                                    <SANTypography
                                        component='span'
                                        variant='caption2'
                                        strong
                                    >
                                        {!!params.get('pesquisa').length
                                            ? params.get('pesquisa')
                                            : `" "`}
                                    </SANTypography>
                                </SANBox>
                                {results.length ? (
                                    <SANInfiniteScroll
                                        threshold={64}
                                        loadMore={() =>
                                            fetchMore({
                                                variables: {
                                                    skip: results.length
                                                },
                                                updateQuery: updateGlobalSearchCache
                                            })
                                        }
                                        hasMore={
                                            results.length < globalSearch.count
                                        }
                                    >
                                        <SANSearchResultList
                                            dataSource={results}
                                            renderItem={item => (
                                                <SANSearchResultItem
                                                    key={item.resourceId}
                                                    item={item}
                                                    onClick={item =>
                                                        goToResource({
                                                            resourceId:
                                                                item.resourceId,
                                                            type: item.type,
                                                            resourceType:
                                                                item.resourceType,
                                                            course: item.course,
                                                            themeId:
                                                                item.themeId
                                                        })
                                                    }
                                                />
                                            )}
                                        />
                                    </SANInfiniteScroll>
                                ) : (
                                    <SANEmpty />
                                )}
                            </>
                        )
                    }}
                </SANQuery>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(FLXSearchPage)
