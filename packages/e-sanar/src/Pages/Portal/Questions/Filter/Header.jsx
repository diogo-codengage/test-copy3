import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'

const intlQuestionsPath = 'questionBase.'
const intlQuestionsFilterPath = `${intlQuestionsPath}filter.`

const SANQuestionsFilterHeader = ({ goHistory }) => {
    const { t } = useTranslation('esanar')

    return (
        <div className='questions-filter__header'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    title={
                        <ESTypography level={4}>
                            {t(`${intlQuestionsFilterPath}title`)}
                        </ESTypography>
                    }
                    subtitle={t(`${intlQuestionsFilterPath}subtitle`)}
                    extra={
                        <div className='d-flex align-items-center'>
                            <ESButton
                                variant='text'
                                uppercase
                                bold
                                size='small'
                                className='mr-lg'
                                onClick={goHistory}
                            >
                                {t(`${intlQuestionsPath}hitoricButton`)}
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
                                    {t(
                                        `${intlQuestionsFilterPath}startPracticeButton`
                                    )}
                                </ESButton>
                            </ESFormItem>
                        </div>
                    }
                />
            </SANPortalPagesContainer>
        </div>
    )
}

SANQuestionsFilterHeader.propTypes = {
    goHistory: PropTypes.func.isRequired
}

export default SANQuestionsFilterHeader
