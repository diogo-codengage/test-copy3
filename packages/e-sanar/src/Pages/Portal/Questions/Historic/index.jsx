import React from 'react'

import { useTranslation } from 'react-i18next'
import { Query } from 'react-apollo'

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
    const {
        me: { id }
    } = useAuthContext()
    const { t } = useTranslation('esanar')

    return (
        <Query
            query={GET_HISTORIC_QUESTIONS}
            variables={{ userId: id }}
            skip={!id}
        >
            {({ loading, error, data }) => {
                if (loading) return <ESSpin spinning flex />
                if (error) return `Error! ${error}`
                return (
                    <>
                        <SANQuestionsHistoricHeader />
                        <div className='questions-historic'>
                            <SANPortalPagesContainer>
                                {data.userAnswers &&
                                data.userAnswers.data.length ? (
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
                                                total={100}
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
