import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

const intlPath = 'questionBase.historic.'

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
                    extra={
                        <ESButton
                            variant='solid'
                            color='primary'
                            uppercase
                            bold
                            size='small'
                            onClick={() => history.push('./filtro')}
                        >
                            {t(`${intlPath}questionsButton`)}
                        </ESButton>
                    }
                />
            </SANPortalPagesContainer>
        </div>
    )
}

SANQuestionsHistoricHeader.propTypes = {}

export default withRouter(SANQuestionsHistoricHeader)
