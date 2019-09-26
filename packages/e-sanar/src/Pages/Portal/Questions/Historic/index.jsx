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
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'

const SANQuestionsHistoric = () => {
    const [current, setCurrent] = useState(1)
    const [pageSize] = useState(10)
    const [err, setErr] = useState(null)
    const {
        me: { id }
    } = useAuthContext()
    const { t } = useTranslation('esanar')

    const getSubtitle = answer => {
        if (answer.question.institution) {
            return `${answer.question.institution.name}, ${
                answer.question.year
            }`
        }
    }

    const getImage = images => {
        if (images && images.data && images.data.length) {
            return images.data[0].sized_images.small.url
        }
    }

    const renderItem = answer => (
        <ESHistoricalIssuesItem
            key={answer.id}
            title={answer.question.statement}
            subtitle={getSubtitle(answer)}
            image={getImage(answer.question.images)}
        />
    )
    const handleErr = err => {
        setErr(err)
    }

    return (
        <Query
            query={GET_HISTORIC_QUESTIONS}
            variables={{
                userId: id,
                limit: pageSize,
                skip: pageSize * current - pageSize
            }}
            fetchPolicy='cache-and-network'
            onError={handleErr}
        >
            {({ loading, error, data }) => {
                if (error || err)
                    return (
                        <div className='questions-historic__err-container'>
                            <SANErrorPiece
                                message={t('questionBase.historic.error')}
                            />
                        </div>
                    )

                const count = !loading ? data.userAnswers.count : 0
                const userAnswers = !loading ? data.userAnswers.data : []
                return (
                    <>
                        <SANQuestionsHistoricHeader />
                        <div className='questions-historic'>
                            <SANPortalPagesContainer>
                                {loading ? (
                                    <ESSpin spinning flex />
                                ) : userAnswers.length ? (
                                    <>
                                        <ESHistoricalIssuesList>
                                            {userAnswers.map(renderItem)}
                                        </ESHistoricalIssuesList>
                                        {count > pageSize && (
                                            <div className='d-flex justify-content-center'>
                                                <ESPagination
                                                    total={count}
                                                    current={current}
                                                    onChange={setCurrent}
                                                    className='pb-lg mt-xl'
                                                />
                                            </div>
                                        )}
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
