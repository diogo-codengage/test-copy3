import React, { useState } from 'react'

import { Query } from 'react-apollo'
import { useTranslation } from 'react-i18next'

import ESHistoricalIssuesList, {
    ESHistoricalIssuesItem
} from 'sanar-ui/dist/Components/Molecules/HistoricalIssuesList'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import ESEmpty from 'sanar-ui/dist/Components/Atoms/Empty'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

import { GET_HISTORIC_QUESTIONS } from 'Apollo/Questions/queries/historic'
import { useAuthContext } from 'Hooks/auth'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import SANQuestionsHistoricHeader from './Header'

const SANQuestionsHistoric = () => {
    const [current, setCurrent] = useState(1)
    const [pageSize] = useState(10)
    const {
        me: { id }
    } = useAuthContext()
    const { t } = useTranslation('esanar')

    return (
        <Query
            query={GET_HISTORIC_QUESTIONS}
            variables={{
                userId: id,
                limit: pageSize,
                skip: pageSize * current - pageSize
            }}
            skip={!id}
        >
            {({ loading, error, data: { userAnswers } }) => {
                if (loading) return <ESSpin spinning flex />
                if (error) return `Error! ${error}`
                const { data, count } = userAnswers
                return (
                    <>
                        <SANQuestionsHistoricHeader />
                        <div className='questions-historic'>
                            <SANPortalPagesContainer>
                                {data.length ? (
                                    <>
                                        <ESHistoricalIssuesList>
                                            {data.userAnswers.data.map(
                                                answer => (
                                                    <ESHistoricalIssuesItem
                                                        key={answer.id}
                                                        title={
                                                            answer.question
                                                                .statement
                                                        }
                                                        subtitle={`${
                                                            answer.question
                                                                .statement
                                                        }, ${answer.year}`}
                                                    />
                                                )
                                            )}
                                        </ESHistoricalIssuesList>
                                        <div className='d-flex justify-content-center'>
                                            <ESPagination
                                                total={count}
                                                current={current}
                                                onChange={setCurrent}
                                                className='pb-lg mt-xl'
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <ESEmpty
                                        description={t(
                                            'questionBase.historic.empty'
                                        )}
                                        className='mt-xl mb-xl'
                                    />
                                )}
                            </SANPortalPagesContainer>
                        </div>
                    </>
                )
            }}
        </Query>
    )
}

export default SANQuestionsHistoric
