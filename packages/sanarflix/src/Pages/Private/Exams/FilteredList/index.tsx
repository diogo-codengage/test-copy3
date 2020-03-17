import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroller'
import { message } from 'antd'

import {
    SANBox,
    SANList,
    SANLayoutContainer,
    SANTypography
} from '@sanar/components'
import { GET_EXAMS, IExam, IExamQuery } from 'Apollo/Exams/Queries/exams'
import FLXExamFilterSimple from '../../../../Components/Exams/Filter/Simple'
import { renderItem, ExamsCount, EmptyExamsLabel } from '../../../../Components/Exams/List'
import { IFilters } from '../../../../Components/Exams/Filter/Context'

interface IFilteredListProps {
    filters?: IFilters
}

const FilteredList = (props: IFilteredListProps) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [exams, setExams] = useState<IExam[]>([])
    const [examsCount, setExamsCount] = useState<number|null>(null)

    const fetchExamsList = async () => {
        try {
            const response = await client.query<IExamQuery>({
                query: GET_EXAMS,
                variables: {
                    limit: 5,
                    medUniversityId: 'test'
                }
            })
            setExamsCount(response.data.quizExams.count)
            setExams(response.data.quizExams.data)
        } catch {
            message.error(t('global.error'))
        }
        setLoading(false)
    }

    const onLoadMore = () => {
        setLoading(true)
        fetchExamsList()
    }

    useEffect(() => {
        fetchExamsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANBox>
            <SANBox backgroundColor='grey-solid.1'>
                <FLXExamFilterSimple previousFilters={props.filters}/>
            </SANBox>
            <SANBox>
                <SANLayoutContainer pt={8} pb={7}>
                    {examsCount ? (
                        <SANTypography
                            fontSize={{ md: 2 }}
                            color='grey.7'
                            textAlign='left'
                            mb={15}
                        >
                            <ExamsCount color='grey.7' direction={'left'}>
                                <strong>{examsCount}</strong> {t('exams.list.exams')}
                            </ExamsCount>
                        </SANTypography>
                    ) : null}
                    {!loading && (!exams || exams.length === 0) ? (
                        <EmptyExamsLabel />
                    ) : (
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={onLoadMore}
                            hasMore={!loading && hasMore}
                            useWindow={false}
                        >
                            <SANList
                                dataSource={exams}
                                loading={loading}
                                renderItem={(item) => renderItem(item, t)}
                            />
                        </InfiniteScroll>
                    )}
                </SANLayoutContainer>
            </SANBox>
        </SANBox>
    )
}

export default FilteredList
