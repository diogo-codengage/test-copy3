import React, { useEffect } from 'react'

import { compose } from 'ramda'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANButton, withSANForm, SANForm, SANFormItem } from '@sanar/components'

import RMSubheader from './Subheader'
import RMFilterSelects from '../Filter/Selects'
import RMFilterAdvanced from '../Filter/Advanced'
import { useQuestionsContext } from '../Context'

interface IProps extends RouteComponentProps {
    form: any
}

const RMFilter = ({ history, form }: IProps) => {
    const { t } = useTranslation('resmed')
    const { startStopwatch, pauseStopwatch } = useQuestionsContext()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                history.push('./pratica')
            }
        })
    }

    useEffect(() => {
        pauseStopwatch()
        return () => startStopwatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANForm form={form} onSubmit={handleSubmit}>
            <RMSubheader>
                <SANFormItem m='0'>
                    <SANButton
                        size='small'
                        variant='solid'
                        color='primary'
                        bold
                        uppercase
                        htmlType='submit'
                    >
                        {t('practicalArea.question.continue')}
                    </SANButton>
                </SANFormItem>
            </RMSubheader>
            <RMFilterSelects />
            <RMFilterAdvanced />
        </SANForm>
    )
}

const enhance = compose(withSANForm, withRouter)

export default enhance(RMFilter)
