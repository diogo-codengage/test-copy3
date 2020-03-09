import React from 'react'
import SANPortalLayoutContainer from 'Pages/Portal/Layout/Container'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { withRouter } from 'react-router'
import { useTranslation } from 'react-i18next'

const intlQuestionsPath = 'questionBase.'
const intlPracticeCompletedPath = `${intlQuestionsPath}completed.`

const SANPracticeCompletedHeader = ({ history }) => {
    const { t } = useTranslation('esanar')

    return (
        <div className='san-practice-completed__header'>
            <SANPortalLayoutContainer>
                <ESSessionTitle
                    title={
                        <ESTypography level={4}>
                            {t(`${intlPracticeCompletedPath}title`)}
                        </ESTypography>
                    }
                    subtitle={t(`${intlPracticeCompletedPath}subtitle`)}
                    extra={
                        <div className='d-flex align-items-center'>
                            {/* <ESButton
                                variant='text'
                                uppercase
                                bold
                                size='small'
                                className='mr-lg'
                                onClick={() => history.push('./historico')}
                            >
                                {t(`${intlQuestionsPath}hitoricButton`)}
                            </ESButton> */}
                            <ESButton
                                variant='solid'
                                color='primary'
                                uppercase
                                bold
                                size='small'
                                onClick={() => history.push('./')}
                            >
                                {t(`${intlQuestionsPath}questionsButton`)}
                            </ESButton>
                        </div>
                    }
                />
            </SANPortalLayoutContainer>
        </div>
    )
}

export default withRouter(SANPracticeCompletedHeader)
