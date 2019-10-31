import React from 'react'
import {
    SANInfiniteScroll,
    SANCol,
    SANCardCourseModule,
    SANRow,
    SANSpin,
    SANEmpty,
    SANBox,
    SANGenericError
} from '@sanar/components'
import { useAddedContext } from './Context'
import { withRouter, RouterProps } from 'react-router'
import { ILastAddedContent } from 'Apollo/Added/Queries/added'
import { useTranslation } from 'react-i18next'

const updateAddedContents = (prev: any, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev

    return Object.assign({}, prev, {
        lastAddedContents: {
            ...prev.lastAddedContents,
            data: [
                ...prev.lastAddedContents.data,
                ...fetchMoreResult.lastAddedContents.data
            ]
        }
    })
}

const resources = {
    Document: 'documento',
    Video: 'video',
    Question: 'questoes',
    Quiz: 'questoes'
}

const FLXAddedList = ({ history }: RouterProps) => {
    const { t } = useTranslation('sanarflix')
    const { added, addedCount, loading, fetchMore, error } = useAddedContext()

    if (error) {
        return <SANGenericError />
    }

    if (loading) {
        return (
            <SANBox width='100%' py={5} textAlign='center'>
                <SANSpin />
            </SANBox>
        )
    }

    if (!added.length) {
        return <SANEmpty />
    }

    const onNavigate = (item: ILastAddedContent) => {
        console.log(
            `/portal/sala-aula/${item.theme.course.id}/${item.theme.id}/${
                resources[item.resource_type]
            }/${item.resource_id}`
        )
        history.push(
            `/portal/sala-aula/${item.theme.course.id}/${item.theme.id}/${
                resources[item.resource_type]
            }/${item.resource_id}`
        )
    }

    return (
        <SANInfiniteScroll
            threshold={204}
            loadMore={() =>
                fetchMore({
                    variables: {
                        skip: added.length
                    },
                    updateQuery: updateAddedContents
                })
            }
            hasMore={added.length < addedCount}
        >
            <SANRow gutter={24}>
                {added &&
                    added.map((item, index) => (
                        <SANCol key={index} xs={12} lg={8} xl={6}>
                            <SANCardCourseModule
                                key={index}
                                mb='xl'
                                newBadge
                                title={item.title}
                                type={item.type}
                                resourceType={item.resource_type}
                                image={item.thumbnail}
                                actionName={t('global.access')}
                                onClick={() => onNavigate(item)}
                                moduleName={t(`global.types.${item.type}`)}
                            />
                        </SANCol>
                    ))}
            </SANRow>
        </SANInfiniteScroll>
    )
}

export default withRouter(FLXAddedList)
