import React from 'react'

import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const intlPath = 'courseDetails.tabQuestions.'

const SANQuestionList = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className='interact'>
                <SANPortalPagesContainer>
                    <ESSessionTitle
                        extra={
                            <ESButton
                                size='small'
                                variant='solid'
                                bold
                                uppercase
                                blockOnlyMobile
                            >
                                {t(`${intlPath}interact.button`)}
                            </ESButton>
                        }
                        title={t(`${intlPath}interact.title`)}
                        subtitle={t(`${intlPath}interact.subtitle`)}
                    />
                </SANPortalPagesContainer>
            </div>
        </>
    )
}

export default SANQuestionList
