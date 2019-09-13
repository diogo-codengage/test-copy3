import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANBox,
    SANHeader,
    SANLayoutContainer,
    SANList,
    SANListItemDefault,
    SANTypography,
    SANInfiniteScroll
} from '@sanar/components'
import { useQuery } from '@apollo/react-hooks'
import { GET_GLOBAL_SEARCH } from 'Apollo/Search/Queries/page-global-search'
import { useTranslation } from 'react-i18next'

const resources = {
    Document: 'documento',
    Video: 'video',
    Question: 'quiz'
}

const FLXSearchPage: React.FC<RouteComponentProps> = ({
    location,
    history
}) => {
    const { t } = useTranslation('sanarflix')
    let params: any = new URLSearchParams(location.search)

    const { data, loading, fetchMore } = useQuery(GET_GLOBAL_SEARCH, {
        variables: {
            value: params.get('pesquisa') || 'xpto',
            limit: 20
        }
    })

    const goToResource = ({
        resource_id: resource,
        resource_type: type,
        course,
        theme
    }) => {
        if (type.toLocaleLowerCase() === 'course') {
            history.push(`/portal/curso/${resource}`)
        } else {
            history.push(
                `/portal/sala-aula/${course.id}/${theme.id}/${resources[type]}/${resource}`
            )
        }
    }

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
            />
            <SANLayoutContainer mt={8} pb={6} style={{ overflow: 'hidden' }}>
                <SANBox mb={7}>
                    <SANTypography component='span' variant='caption-2' strong>
                        {(data.globalSearch && data.globalSearch.count) || 0}{' '}
                    </SANTypography>
                    <SANTypography component='span' variant='caption-2'>
                        {t('global.foundResults')}
                    </SANTypography>{' '}
                    <SANTypography component='span' variant='caption-2' strong>
                        {params.get('pesquisa')}
                    </SANTypography>
                </SANBox>
                <SANInfiniteScroll
                    threshold={64}
                    loadMore={() =>
                        fetchMore({
                            variables: {
                                skip: data.globalSearch.data.length
                            },
                            updateQuery: (prev: any, { fetchMoreResult }) => {
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
                        })
                    }
                    hasMore={
                        !!data.globalSearch &&
                        data.globalSearch.data.length < data.globalSearch.count
                    }
                >
                    <SANList
                        loading={loading}
                        dataSource={data.globalSearch && data.globalSearch.data}
                        renderItem={(item, index) => (
                            <SANListItemDefault
                                key={index}
                                title={item.resource_title}
                                type={item.type}
                                hasIcon
                                onClick={() => goToResource(item)}
                            />
                        )}
                    />
                </SANInfiniteScroll>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default withRouter(FLXSearchPage)
