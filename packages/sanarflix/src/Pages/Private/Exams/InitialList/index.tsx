import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANBox,
    SANDivider,
    SANList,
    SANLayoutContainer,
    SANStyled,
    SANTypography
} from '@sanar/components'
import { GET_EXAMS, IExam, IExamQuery } from 'Apollo/Exams/Queries/exams'
import { IMedUniversity } from 'Apollo/Exams/Queries/medUniversities'

import FLXExamFilter from '../../../../Components/Exams/Filter'
import { renderItem, ExamsCount, EmptyExamsLabel } from '../../../../Components/Exams/List'

interface IListProps {
    medUniversity: IMedUniversity
    searchExams: () => void
}

const LoadMoreBox = SANStyled.div`
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    line-height: 32px;
    color: #600f30;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
`

const List = ({ searchExams, medUniversity }: IListProps) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const [loading, setLoading] = useState<boolean>(false)
    const [initLoading, setInitLoading] = useState<boolean>(true)
    const [exams, setExams] = useState<IExam[]>([])
    const [examsCount, setExamsCount] = useState<number|null>(null)
    const [loadMoreClicks, setLoadMoreClicks] = useState<number>(0)

    const fetchExamsList = async () => {
        try {
            const response = await client.query<IExamQuery>({
                query: GET_EXAMS,
                variables: {
                    limit: 5,
                    skip: exams.length,
                    medUniversityId: medUniversity.id
                }
            })
            setExamsCount(response.data.quizExams.count)
            exams.length > 0
                ? setExams(exams.concat(response.data.quizExams.data))
                : setExams(response.data.quizExams.data)
        } catch {
        }
        setInitLoading(false)
        setLoading(false)
    }

    useEffect(() => {
        fetchExamsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirect = () => {
        searchExams()
    }

    const onLoadMore = () => {
        window.analytics.track('LoadMoreExamsClicked', { universityId: medUniversity.id})
        if (loadMoreClicks >= 1) {
            redirect()
            return
        }
        setInitLoading(true)
        setLoading(true)
        fetchExamsList()
        setLoadMoreClicks(loadMoreClicks + 1)
    }

    const loadMore = () => {
        return !initLoading && !loading ? (
            <SANBox>
                <SANDivider bg='grey.2' />
                <LoadMoreBox onClick={onLoadMore}>
                    {t('exams.list.loadMore')}
                </LoadMoreBox>
            </SANBox>
        ) : null;
    }

    return (
        <SANBox>
            <SANBox backgroundColor='grey-solid.1'>
                <SANLayoutContainer pt={8} pb={7}>
                    <SANTypography
                        fontSize={{ md: 4 }}
                        color='grey.7'
                        strong
                        textAlign='left'
                        mb={10}
                    >
                        {t('exams.list.title') + medUniversity.name}
                    </SANTypography>
                    {examsCount ? (
                        <SANTypography
                            fontSize={{ md: 2 }}
                            color='grey.7'
                            textAlign='left'
                            mb={15}
                        >
                            {t('exams.list.subtitle')}
                            <ExamsCount color='grey.7' direction={'right'}>
                                <strong>{examsCount}</strong> {t('exams.list.exams')}
                            </ExamsCount>
                        </SANTypography>
                    ) : null}
                    {!initLoading && !loading && (!exams || exams.length === 0) ? (
                        <EmptyExamsLabel />
                    ) : (
                        <SANList
                            dataSource={exams}
                            loading={initLoading}
                            loadMore={examsCount && examsCount >= 5 ? loadMore() : undefined}
                            renderItem={(item) => renderItem(item, t)}
                        />
                    )}
                </SANLayoutContainer>
            </SANBox>
            <SANBox>
                <FLXExamFilter
                    universityId={medUniversity.id}
                    searchExams={searchExams}
                />
            </SANBox>
        </SANBox>
    )
}

export default List
