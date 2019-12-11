import React, { useEffect } from 'react'

import { compose } from 'ramda'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANButton,
    withSANForm,
    SANForm,
    SANFormItem,
    SANBox
} from '@sanar/components'

import RMSubheader from './Subheader'
import RMFilterSelects from '../Filter/Selects'
import RMFilterAdvanced, { OnlyComments } from '../Filter/Advanced'
import { useQuestionsContext } from '../Context'
import { Performace } from './Subheader'
interface IProps extends RouteComponentProps {
    form: any
}

const RMFilter = ({ history, form }: IProps) => {
    const { t } = useTranslation('resmed')
    const {
        startStopwatch,
        pauseStopwatch,
        dispatch,
        handleTrackFilter
    } = useQuestionsContext()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                handleTrackFilter(values)
                dispatch({ type: 'filter', filter: values })
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
            <RMSubheader extra={<OnlyComments m='0' />}>
                <SANBox>
                    <SANFormItem m='0'>
                        <SANButton
                            size='small'
                            variant='solid'
                            color='primary'
                            bold
                            block
                            uppercase
                            htmlType='submit'
                        >
                            {t('practicalArea.question.continue')}
                        </SANButton>
                    </SANFormItem>
                </SANBox>
            </RMSubheader>
            <RMFilterSelects />
            <RMFilterAdvanced />
            <Performace
                display={{ _: 'flex', lg: 'none' }}
                justifyContent='space-around'
                mt='lg'
                vertical
            />
        </SANForm>
    )
}

const enhance = compose(withSANForm, withRouter)

export default enhance(RMFilter)
