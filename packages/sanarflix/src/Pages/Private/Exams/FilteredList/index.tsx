import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANList,
    SANLayoutContainer,
    SANTypography,
    SANInfiniteScroll,
    SANEmpty,
    useSnackbarContext,
    SANSpin
} from '@sanar/components'
import { GET_EXAMS, IExam, IExamQuery } from 'Apollo/Exams/Queries/exams'
import FLXExamFilterSimple from 'Components/Exams/Filter/Simple'
import { renderItem, ExamsCount } from 'Components/Exams/List'
import { IYearSemester, useExamFilterContext } from 'Components/Exams/Filter/Context'

interface IFilteredListProps {
    university: string
}

const FilteredList = ({ university }: IFilteredListProps) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [exams, setExams] = useState<IExam[]>([])
    const [examsCount, setExamsCount] = useState<number|null>(null)
    const { state } = useExamFilterContext()
    const snackbar = useSnackbarContext()

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

    const fetchExamsList = async () => {
        setLoading(true)
        const universityId = state.university.length > 0 ? state.university : university
        try {
            const response = await client.query<IExamQuery>({
                query: GET_EXAMS,
                variables: {
                    limit: 15,
                    skip: exams.length,
                    medUniversityId: universityId,
                    disciplineIds: state.discipline,
                    themesIds: state.theme,
                    semesters: createYearSemesters(state.semester)
                }
            })
            const data = response.data.quizExams.data
            setExamsCount(response.data.quizExams.count)
            if (exams.length > 0) {
                exams[1].medUniversity.id === universityId
                    ? setExams(exams.concat(data))
                    : setExams(data)
            } else {
                setExams(data)
            }
        } catch {
            snackbar({
                message: t('global.error'),
                theme: 'error'
            })
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
                <FLXExamFilterSimple applyFilter={fetchExamsList}/>
            </SANBox>
            <SANBox>
                <SANLayoutContainer pt={8} pb={7}>
                    {examsCount && exams.length > 0 ? (
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
                        <SANEmpty />
                    ) : (
                        <SANInfiniteScroll
                            loadMore={fetchExamsList}
                            hasMore={!loading && hasMore}
                        >
                            {exams.length > 0 &&
                                <SANList
                                    mt={5}
                                    dataSource={exams}
                                    renderItem={(item) => renderItem(item, t)}
                                />
                            }
                            {loading &&
                                <SANBox width='100%' py={5} textAlign='center'>
                                    <SANSpin />
                                </SANBox>
                            }
                        </SANInfiniteScroll>
                    )}
                </SANLayoutContainer>
            </SANBox>
        </SANBox>
    )
}

export default FilteredList