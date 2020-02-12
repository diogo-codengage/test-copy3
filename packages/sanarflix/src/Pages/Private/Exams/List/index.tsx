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
    const [examsTest, setExamsTest] = useState<IExam[]>([])
    const [examsCount, setExamsCount] = useState<number|null>(null)

    const fetchExamsList = async () => {
        try {
            const {
                data: { exams }
            } = await client.query<IExamQuery>({
                query: GET_EXAMS,
                variables: { limit: 5, skip: 5 }
            })
            setExams(exams)
        } catch {
        }
        setInitLoading(false)
        setLoading(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setExamsTest([
                {
                    id: 'teste1',
                    title: 'Prova 1',
                    year: '2019',
                    semester: '1',
                    questionsCount: 17,
                    discipline: {id: 'teste1', name: 'Disciplina 1'},
                    theme: {id: 'teste1', name: 'Tema 1'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
                {
                    id: 'teste2',
                    title: 'Prova 2',
                    year: '2017',
                    semester: '2',
                    questionsCount: 19,
                    discipline: {id: 'teste2', name: 'Disciplina 2'},
                    theme: {id: 'teste2', name: 'Tema 2'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
                {
                    id: 'teste3',
                    title: 'Prova 3',
                    year: '2018',
                    semester: '2',
                    questionsCount: 10,
                    discipline: {id: 'teste3', name: 'Disciplina 3'},
                    theme: {id: 'teste3', name: 'Tema 3'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
                {
                    id: 'teste4',
                    title: 'Prova 4',
                    year: '2019',
                    semester: '2',
                    questionsCount: 13,
                    discipline: {id: 'teste4', name: 'Disciplina 4'},
                    theme: {id: 'teste4', name: 'Tema 4'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
            ])
            setInitLoading(false)
        }, 2000)

        // fetchExamsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const watchExamsCount = () => {
            setExamsCount(examsTest.length)
        }
        watchExamsCount()
    }, [examsTest])

    const onLoadMore = () => {
        setInitLoading(true)
        setLoading(true)
        setTimeout(() => {
            setExamsTest(examsTest.concat([
                {
                    id: 'teste1',
                    title: 'Prova 1',
                    year: '2019',
                    semester: '1',
                    questionsCount: 17,
                    discipline: {id: 'teste1', name: 'Disciplina 1'},
                    theme: {id: 'teste1', name: 'Tema 1'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
                {
                    id: 'teste2',
                    title: 'Prova 2',
                    year: '2017',
                    semester: '2',
                    questionsCount: 19,
                    discipline: {id: 'teste2', name: 'Disciplina 2'},
                    theme: {id: 'teste2', name: 'Tema 2'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
                {
                    id: 'teste3',
                    title: 'Prova 3',
                    year: '2018',
                    semester: '2',
                    questionsCount: 10,
                    discipline: {id: 'teste3', name: 'Disciplina 3'},
                    theme: {id: 'teste3', name: 'Tema 3'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
                {
                    id: 'teste4',
                    title: 'Prova 4',
                    year: '2019',
                    semester: '2',
                    questionsCount: 13,
                    discipline: {id: 'teste4', name: 'Disciplina 4'},
                    theme: {id: 'teste4', name: 'Tema 4'},
                    medUniversity: {id: 'teste1', label: 'Faculdade 1'}
                },
            ]))
            setInitLoading(false)
            setLoading(false)
        }, 2000)

        // setLoading(true)
        // fetchExamsList()
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
                    <SANTypography
                        fontSize={{ md: 2 }}
                        color='grey.7'
                        textAlign='left'
                        mb={15}
                    >
                        {t('exams.list.subtitle')}
                        {examsCount && (
                            <ExamsCount color='grey.7'>
                                <strong>{examsCount}</strong> {t('exams.list.exams')}
                            </ExamsCount>
                        )}
                    </SANTypography>
                    <SANList
                        dataSource={examsTest}
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
