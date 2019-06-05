import React from 'react'

import { useTranslation } from 'react-i18next'

import ESHistoricalIssuesList, {
    ESHistoricalIssuesItem
} from 'sanar-ui/dist/Components/Molecules/HistoricalIssuesList'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import ESEmpty from 'sanar-ui/dist/Components/Atoms/Empty'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import SANQuestionsHistoricHeader from './Header'

// const arr = Array.from(new Array(10), (_, i) => i)
const arr = []

const SANQuestionsHistoric = () => {
    const { t } = useTranslation('esanar')
    return (
        <>
            <SANQuestionsHistoricHeader />
            <div className='questions-historic'>
                <SANPortalPagesContainer>
                    {arr.length ? (
                        <>
                            <ESHistoricalIssuesList>
                                {arr.map((e, i) => (
                                    <ESHistoricalIssuesItem
                                        key={i}
                                        title='Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna sit amet, luctus aliquet nibh. Curabitur auctor leo et libero consectetur gravida. Morbi gravida et sem dictum varius. Proin eget viverra sem, non euismod est. Maecenas facilisis urna in lectus aliquet venenatis. Etiam et metus nec mauris condimentum vulputate. Aenean volutpat odio quis egestas tempus. Fusce tempor vulputate luctus. Pellentesque vulputate viverra ex eget elementum. Aliquam ut feugiat felis.'
                                        subtitle='Instituição porem ipsum, 2014'
                                    />
                                ))}
                            </ESHistoricalIssuesList>
                            <div className='d-flex justify-content-center'>
                                <ESPagination
                                    current={5}
                                    total={100}
                                    className='pb-lg mt-xl'
                                />
                            </div>
                        </>
                    ) : (
                        <ESEmpty
                            description={t('questionBase.historic.empty')}
                            className='mt-xl mb-xl'
                        />
                    )}
                </SANPortalPagesContainer>
            </div>
        </>
    )
}

export default SANQuestionsHistoric
