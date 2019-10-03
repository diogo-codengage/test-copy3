import React, { useEffect } from 'react'
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
    SANList,
    SANListItemDefault,
    SANTypography,
    SANInfiniteScroll,
    SANEmpty,
    SANQuery
} from '@sanar/components'
import FLXSearch from 'Components/Search'

import { events } from 'Config/Segment'

const resources = {
    Document: 'documento',
    Video: 'video',
    Question: 'quiz'
}

const updateGlobalSearchCache = (prev: any, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev
    return Object.assign({}, prev, {
        globalSearch: {
            ...prev.globalSearch,
            data: [
                ...prev.globalSearch.data,
                ...fetchMoreResult.globalSearch.data
            ]
        }
    })
}

const FLXSearchPage = ({ location, history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
    const params: any = new URLSearchParams(location.search)

    const goToResource = ({
        resource_id: resource,
        resource_type: type,
        course,
        theme
    }) => {
        const content = {
            resource,
            type,
            course,
            theme
        }
        if (type.toLocaleLowerCase() === 'course') {
            const link = `/portal/curso/${resource}`
            window.analytics.track(events['Search Result Clicked'].event, {
                link,
                content
            })
            history.push(`/portal/curso/${resource}`)
        } else {
            const link = `/portal/sala-aula/${course.id}/${theme.id}/${resources[type]}/${resource}`
            window.analytics.track(events['Search Result Clicked'].event, {
                link,
                content
            })
            history.push(link)
        }
    }

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
                    title: 'Resultado da busca'
                }}
                extra={
                    <FLXSearch initialValue={params.get('pesquisa') || ''} />
                }
            />
            {console.log({ params })}
            <SANLayoutContainer mt={8} pb={6} style={{ overflow: 'hidden' }}>
                <SANQuery
                    query={GET_GLOBAL_SEARCH}
                    loaderProps={{ flex: true }}
                    options={{
                        variables: {
                            value: params.get('pesquisa') || '',
                            limit: 20
                        }
                    }}
                >
                    {({
                        data: { globalSearch },
                        fetchMore
                    }: {
                        data: IGlobalSearch
                        fetchMore: (data: any) => Object
                    }) => (
                        <>
                            <SANBox mb={7}>
                                <SANTypography
                                    component='span'
                                    variant='caption-2'
                                    strong
                                >
                                    {(globalSearch && globalSearch.count) || 0}{' '}
                                </SANTypography>
                                <SANTypography
                                    component='span'
                                    variant='caption-2'
                                >
                                    {t('global.foundResults')}
                                </SANTypography>{' '}
                                <SANTypography
                                    component='span'
                                    variant='caption-2'
                                    strong
                                ></SANTypography>
                            </SANBox>
                            {globalSearch && !!globalSearch.data.length ? (
                                <SANInfiniteScroll
                                    threshold={64}
                                    loadMore={() =>
                                        fetchMore({
                                            variables: {
                                                skip: globalSearch.data.length
                                            },
                                            updateQuery: updateGlobalSearchCache
                                        })
                                    }
                                    hasMore={
                                        !!globalSearch &&
                                        globalSearch.data.length <
                                            globalSearch.count
                                    }
                                >
                                    <SANList
                                        dataSource={
                                            globalSearch && globalSearch.data
                                        }
                                        renderItem={(item, index) => (
                                            <SANListItemDefault
                                                key={index}
                                                title={item.resource_title}
                                                type={item.type}
                                                hasIcon
                                                onClick={() =>
                                                    goToResource(item)
                                                }
                                            />
                                        )}
                                    />
                                </SANInfiniteScroll>
                            ) : (
                                <SANEmpty />
                            )}
                        </>
                    )}
                </SANQuery>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(FLXSearchPage)
