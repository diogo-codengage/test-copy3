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
import {
    IYearSemester,
    useExamFilterContext
} from 'Components/Exams/Filter/Context'
import { useExamsContext } from '../Context'
import { useHistory } from 'react-router'

const FilteredList = () => {
    const client = useApolloClient()
    const history = useHistory()
    const { t } = useTranslation('sanarflix')
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [exams, setExams] = useState<IExam[]>([])
    const [examsCount, setExamsCount] = useState<number | null>(null)
    const { state } = useExamFilterContext()
    const snackbar = useSnackbarContext()

    const { medUniversity } = useExamsContext()

    const university = medUniversity.medUniversity

    const createYearSemesters = semesters => {
        let yearSemesters: IYearSemester[] = []
        if (!!semesters.length) {
            yearSemesters = semesters.map(item => {
                const arrPeriod = item.split('.')
                return { year: arrPeriod[0], semester: arrPeriod[1] }
            })
        }
        return yearSemesters
    }

    const universityId =
        state.university.length > 0 ? state.university : university

    const examsQuery = async (notSkip?: boolean) => {
        setLoading(true)
        return await client.query<IExamQuery>({
            query: GET_EXAMS,
            variables: {
                limit: 15,
                skip: notSkip ? 0 : exams.length,
                medUniversityId: universityId,
                disciplineIds: state.discipline,
                themesIds: state.theme,
                semesters: createYearSemesters(state.semester)
            }
        })
    }

    const fetchExamsList = async () => {
        try {
            const response = await examsQuery()
            setExamsCount(response.data.quizExams.count)
            const data = response.data.quizExams.data
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

    const applyFilters = async () => {
        setExams([])
        setExamsCount(null)
        try {
            const response = await examsQuery(true)
            setExamsCount(response.data.quizExams.count)
            setExams(response.data.quizExams.data)
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
                <FLXExamFilterSimple applyFilter={applyFilters} />
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
                                <strong>{examsCount}</strong>{' '}
                                {t('exams.list.exams')}
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
                            {exams.length > 0 && (
                                <SANList
                                    mt={5}
                                    dataSource={exams}
                                    renderItem={item =>
                                        renderItem(item, t, history)
                                    }
                                />
                            )}
                            {loading && (
                                <SANBox width='100%' py={5} textAlign='center'>
                                    <SANSpin />
                                </SANBox>
                            )}
                        </SANInfiniteScroll>
                    )}
                </SANLayoutContainer>
            </SANBox>
        </SANBox>
    )
}

export default FilteredList
