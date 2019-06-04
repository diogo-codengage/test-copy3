import React from 'react'

import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

const intlPath = 'questionBase.filter.'

const SANQuestionsFilterHeader = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='questions-filter__header'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    title={
                        <ESTypography level={4}>
                            {t(`${intlPath}title`)}
                        </ESTypography>
                    }
                    subtitle={t(`${intlPath}subtitle`)}
                    extra={
                        <div className='d-flex align-items-center'>
                            <ESButton
                                variant='text'
                                uppercase
                                bold
                                size='small'
                                className='mr-lg'
                            >
                                {t(`${intlPath}hitoricButton`)}
                            </ESButton>
                            <ESFormItem>
                                <ESButton
                                    variant='solid'
                                    color='primary'
                                    uppercase
                                    bold
                                    size='small'
                                    type='submit'
                                >
                                    {t(`${intlPath}startPracticeButton`)}
                                </ESButton>
                            </ESFormItem>
                        </div>
                    }
                />
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANQuestionsFilterHeader
