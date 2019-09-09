import React from 'react'

import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

const SANBookmarkedQuestionHeader = ({ bookmarked, goBack, onRemove }) => {
    const { t } = useTranslation('esanar')

    return (
        <SANPortalPagesContainer className='san-bookmark-page__question-subheader'>
            <ESRow>
                <ESCol xs={24} sm={12}>
                    <ESButton
                        className='mb-md'
                        variant='outlined'
                        color='default'
                        size='small'
                        bold
                        uppercase
                        onClick={goBack}
                    >
                        <ESEvaIcon name='arrow-back-outline' />
                        {t('questionBase.question.backBookmark')}
                    </ESButton>
                </ESCol>
                <ESCol xs={24} sm={12}>
                    <ESButton
                        variant='text'
                        size='small'
                        bold
                        className='san-bookmark-page__question-subheader--bookmark'
                        onClick={onRemove}
                    >
                        {bookmarked ? (
                            <ESEvaIcon
                                name='heart'
                                key='bookmarked'
                                color='primary'
                            />
                        ) : (
                            <ESEvaIcon
                                name='heart-outline'
                                key='unbookmarked'
                            />
                        )}
                        {t('questionBase.question.bookmark')}
                    </ESButton>
                </ESCol>
            </ESRow>
        </SANPortalPagesContainer>
    )
}

export default SANBookmarkedQuestionHeader
