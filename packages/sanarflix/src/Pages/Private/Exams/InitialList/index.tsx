import React, { useEffect, useState } from 'react'
import { theme } from 'styled-tools'

import {
    SANBox,
    SANButton,
    SANDivider,
    SANEvaIcon,
    SANList,
    SANLayoutContainer,
    SANListItem,
    SANStyled,
    SANTypography
} from '@sanar/components'
import { useTranslation } from 'react-i18next'
import { GET_EXAMS, IExam, IExamQuery } from 'Apollo/Exams/Queries/exams'
import { IMedUniversity } from 'Apollo/Exams/Queries/medUniversities'

import question from '../../../../Assets/images/exams/question.png'
import { useApolloClient } from '@apollo/react-hooks'

interface IListProps {
    medUniversity: IMedUniversity
}

const Image = SANStyled.img`
    width: 20px;
    margin-bottom: 4px;
`
const ExamsCount = SANStyled.span`
    float: right;
    
    ${theme('mediaQueries.down.md')} {
        visibility: hidden;
    }
`
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

const renderItem = (item: IExam, t) => {
    return (
        <SANListItem>
            <SANTypography strong fontSize={{md: 2}} mb={2}>
                {item.title}: ({item.medUniversity.label} - {item.year}.{item.semester}) {item.discipline.name}
                <SANButton
                    color='primary'
                    variant='solid'
                    uppercase
                    blockOnlyMobile
                    style={{ width: '132px', float: 'right' }}
                >
                    <SANEvaIcon name='edit-2-outline' style={{ marginRight: '6px' }}/>{t('exams.list.train')}
                </SANButton>
            </SANTypography>
            <SANTypography fontSize={{md: 1}}>
                <Image src={question}/> {item.questionsCount} {t('exams.list.questions')}
            </SANTypography>
        </SANListItem>
    )
}

const List = (props: IListProps) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const { medUniversity } = props
    const [loading, setLoading] = useState<boolean>(false)
    const [initLoading, setInitLoading] = useState<boolean>(true)
    const [exams, setExams] = useState<IExam[]>([])
    const [examsCount, setExamsCount] = useState<number|null>(null)
    const [loadMoreClicks, setLoadMoreClicks] = useState<number>(0)

    const fetchExamsList = async () => {
        try {
            const {
                data: { exams }
            } = await client.query<IExamQuery>({
                query: GET_EXAMS,
                variables: {
                    limit: 5,
                    medUniversityId: medUniversity.id
                }
            })
            setExams(exams)
        } catch {
        }
        setInitLoading(false)
        setLoading(false)
    }

    useEffect(() => {
        fetchExamsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLoadMore = () => {
        if (loadMoreClicks >= 1) {
            console.log('redirect')
            return
        }
        setInitLoading(true)
        setLoading(true)
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
                        {t('exams.list.title') + medUniversity.label}
                    </SANTypography>
                    {examsCount ? (
                        <SANTypography
                            fontSize={{ md: 2 }}
                            color='grey.7'
                            textAlign='left'
                            mb={15}
                        >
                            {t('exams.list.subtitle')}
                            <ExamsCount color='grey.7'>
                                <strong>{examsCount}</strong> {t('exams.list.exams')}
                            </ExamsCount>
                        </SANTypography>
                    ) : null}
                    <SANList
                        dataSource={exams}
                        loading={initLoading}
                        loadMore={loadMore()}
                        renderItem={(item) => renderItem(item, t)}
                    />
                </SANLayoutContainer>
            </SANBox>
        </SANBox>
    )
}

export default List
