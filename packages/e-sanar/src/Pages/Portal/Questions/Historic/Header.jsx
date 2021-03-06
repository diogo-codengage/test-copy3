import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

const intlQuestionsPath = 'questionBase.'
const intlPath = `${intlQuestionsPath}historic.`

const SANQuestionsHistoricHeader = ({ history }) => {
    const { t } = useTranslation('esanar')

    return (
        <div className='questions-historic__header'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    title={
                        <ESTypography level={4}>
                            {t(`${intlPath}title`)}
                        </ESTypography>
                    }
                    subtitle={
                        <ESTypography variant='subtitle2'>
                            {t(`${intlPath}subtitle`)}
                        </ESTypography>
                    }
                    extra={
                        <ESButton
                            variant='solid'
                            color='primary'
                            uppercase
                            bold
                            size='small'
                            blockOnlyMobile
                            onClick={() => history.push('./filtro')}
                        >
                            {t(`${intlQuestionsPath}questionsButton`)}
                        </ESButton>
                    }
                />
            </SANPortalPagesContainer>
        </div>
    )
}

SANQuestionsHistoricHeader.propTypes = {}

export default withRouter(SANQuestionsHistoricHeader)
