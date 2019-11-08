import React from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANPage,
    withSANForm,
    SANForm,
    SANButton,
    SANSessionTitle,
    SANFormItem
} from '@sanar/components'

import RMFilterSelects from './Selects'
import RMFilterAdvanced from './Advanced'

import { useQuestionsContext } from '../Context'

const mapItem = item => item.value
export const makeFilter = (values, userId) => {
    if (!userId) {
        throw Error('Argument userId is required in function makeFilter')
    }
    return {
        ...(values.year && {
            years: [Number(values.year.format('YYYY'))]
        }),
        ...(values.tags && { tagIds: values.tags.map(mapItem) }),
        ...(values.levels && {
            levelIds: values.levels.map(mapItem)
        }),
        ...(values.boards && {
            boardIds: values.boards.map(mapItem)
        }),
        ...(values.exams && { examIds: values.exams.map(mapItem) }),
        ...(values.isCommentedByExpert && {
            isCommentedByExpert: values.isCommentedByExpert
        }),
        ...(values.progress === '2' && { notAnsweredByUser: userId }),
        ...(values.progress === '3' && { answeredByUser: userId })
    }
}

const RMFilter = ({ form, history }) => {
    const { t } = useTranslation('resmed')
    const { dispatch } = useQuestionsContext()

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({ type: 'filter', filter: values })
                history.push('/inicio/area-pratica/perguntas')
            }
        })
    }

    return (
        <SANForm form={form} onSubmit={handleSubmit}>
            <SANPage
                hasContainer
                BoxProps={{
                    bg: 'grey-solid.1',
                    py: { xs: '8', _: 'xl' },
                    display: 'flex',
                    flexDirection: 'column'
                }}
                HeaderProps={{
                    onBack: () => history.push('/inicio/curso'),
                    SessionTitleProps: {
                        title: t('practicalArea.filter.header.title'),
                        subtitle: t('practicalArea.filter.header.subtitle')
                    },
                    ExtraProps: {
                        md: 7
                    },
                    extra: (
                        <SANFormItem>
                            <SANButton
                                variant='solid'
                                color='primary'
                                size='small'
                                uppercase
                                htmlType='submit'
                                blockOnlyMobile
                            >
                                {t('practicalArea.filter.header.start')}
                            </SANButton>
                        </SANFormItem>
                    )
                }}
            >
                <SANSessionTitle
                    title={t('practicalArea.filter.subheader.title')}
                    subtitle={t('practicalArea.filter.subheader.subtitle')}
                />
                <RMFilterSelects />
                <RMFilterAdvanced />
            </SANPage>
        </SANForm>
    )
}

const enhance = compose(
    withSANForm,
    withRouter
)

export default enhance(RMFilter)
