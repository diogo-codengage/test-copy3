import React, { useEffect } from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANPage,
    withSANForm,
    SANForm,
    SANButton,
    SANSessionTitle,
    SANBox
} from '@sanar/components'

import RMFilterSelects from './Selects'
import RMFilterAdvanced, { OnlyComments } from './Advanced'

import { useQuestionsContext } from '../Context'

const RMFilter = ({ form, history }) => {
    const { t } = useTranslation('resmed')
    const { dispatch, reset } = useQuestionsContext()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'filter', filter: values })
                history.push('/inicio/area-pratica/perguntas/pratica')
            }
        })
    }

    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANForm form={form} onSubmit={handleSubmit}>
            <SANPage
                hasContainer
                BoxProps={{
                    bg: 'grey-solid.1',
                    py: { xs: '8', _: 'lg' },
                    display: 'flex',
                    flexDirection: 'column'
                }}
                HeaderProps={{
                    onBack: () => history.push('/inicio/curso'),
                    SessionTitleProps: {
                        title: t('practicalArea.filter.header.title'),
                        subtitle: t('practicalArea.filter.header.subtitle'),
                        extra: (
                            <SANBox display='flex' flex='1'>
                                <SANButton
                                    variant='solid'
                                    color='primary'
                                    size='small'
                                    uppercase
                                    htmlType='submit'
                                    bold
                                    block
                                >
                                    {t('practicalArea.filter.header.start')}
                                </SANButton>
                            </SANBox>
                        )
                    }
                }}
            >
                <SANSessionTitle
                    title={t('practicalArea.filter.subheader.title')}
                    subtitle={t('practicalArea.filter.subheader.subtitle')}
                    extra={<OnlyComments m='0' />}
                />
                <RMFilterSelects />
                <RMFilterAdvanced />
            </SANPage>
        </SANForm>
    )
}

const enhance = compose(withSANForm, withRouter)

export default enhance(RMFilter)
