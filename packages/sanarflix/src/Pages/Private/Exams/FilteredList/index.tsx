import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { message } from 'antd'

import {
    SANBox,
    SANList,
    SANLayoutContainer,
    SANTypography,
    SANInfiniteScroll
} from '@sanar/components'
import { GET_EXAMS, IExam, IExamQuery } from 'Apollo/Exams/Queries/exams'
import FLXExamFilterSimple from 'Components/Exams/Filter/Simple'
import { renderItem, ExamsCount, EmptyExamsLabel } from 'Components/Exams/List'
import { IFilters, IYearSemester, useExamFilterContext } from 'Components/Exams/Filter/Context'

interface IFilteredListProps {
    filters?: IFilters
}

const FilteredList = ({ filters }: IFilteredListProps) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [exams, setExams] = useState<IExam[]>([])
    const [examsCount, setExamsCount] = useState<number|null>(null)
    const { state } = useExamFilterContext()

    const createYearSemesters = (semesters) => {
        let yearSemesters: IYearSemester[] = []
        if (!!semesters.length) {
            yearSemesters = semesters.map((item) => {
                const arrPeriod = item.split('.')
                return {year: arrPeriod[0], semester: arrPeriod[1]}
            })
        }
        return yearSemesters
    }

    const applyFilters = () => {
        setLoading(true)
        setExamsCount(null)
        setExams([])
        fetchExamsList()
    }

    const fetchExamsList = async () => {
        setLoading(true)
        try {
            const response = await client.query<IExamQuery>({
                query: GET_EXAMS,
                variables: {
                    limit: 15,
                    skip: exams.length,
                    medUniversityId: state.university,
                    disciplineIds: state.discipline,
                    themesIds: state.theme,
                    semesters: createYearSemesters(state.semester)
                }
            })
            setExamsCount(response.data.quizExams.count)
            exams.length > 0
                ? setExams(exams.concat(response.data.quizExams.data))
                : setExams(response.data.quizExams.data)
        } catch {
            message.error(t('global.error'))
        }
        setLoading(false)
        setHasMore(!!(examsCount && exams.length < examsCount))
    }

    useEffect(() => {
        fetchExamsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANBox>
            <SANBox backgroundColor='grey-solid.1'>
                <FLXExamFilterSimple previousFilters={filters} applyFilter={applyFilters}/>
            </SANBox>
            <SANBox>
                <SANLayoutContainer pt={8} pb={7}>
                    {examsCount ? (
                        <SANTypography
                            fontSize={{ md: 2 }}
                            color='grey.7'
                            textAlign='left'
                            mb={25}
                        >
                            <ExamsCount color='grey.7' direction={'left'}>
                                <strong>{examsCount}</strong> {t('exams.list.exams')}
                            </ExamsCount>
                        </SANTypography>
                    ) : null}
                    {!loading && (!exams || exams.length === 0) ? (
                        <EmptyExamsLabel />
                    ) : (
                        <SANInfiniteScroll
                            loadMore={fetchExamsList}
                            hasMore={!loading && hasMore}
                        >
                            <SANList
                                mt={5}
                                dataSource={exams}
                                loading={loading}
                                renderItem={(item) => renderItem(item, t)}
                            />
                        </SANInfiniteScroll>
                    )}
                </SANLayoutContainer>
            </SANBox>
        </SANBox>
    )
}

export default FilteredList