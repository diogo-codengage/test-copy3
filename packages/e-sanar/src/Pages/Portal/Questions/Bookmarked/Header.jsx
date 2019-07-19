import React from 'react'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import { useTranslation } from 'react-i18next'

const SANBookmarkedQuestionHeader = () => {
    const { t } = useTranslation('esanar')

    return (
        <SANPortalPagesContainer>
            <ESSessionTitle
                title={
                    <ESButton
                        variant='outlined'
                        color='default'
                        size='small'
                        bold
                        uppercase
                    >
                        <ESEvaIcon name='arrow-back-outline' />
                        {t('questionBase.question.backBookmark')}
                    </ESButton>
                }
                extra={
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <ESButton
                            variant='text'
                            color='primary'
                            size='small'
                            bold
                        >
                            <ESEvaIcon name='heart-outline' />
                            {t('questionBase.question.bookmark')}
                        </ESButton>
                        <ESEvaIcon name='more-vertical-outline' />
                    </div>
                }
            />
        </SANPortalPagesContainer>
    )
}

export default SANBookmarkedQuestionHeader
