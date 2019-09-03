import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANLayoutContainer,
    SANSessionTitle,
    SANHeader,
    SANRow,
    SANCol,
    SANButton,
    SANCardSelectFilter,
    SANBox
} from '@sanar/components'

const FLXFilter = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <>
            <SANHeader
                onBack={() => history.goBack()}
                SessionTitleProps={{
                    title: t('questionsDatabase.filter.header.title'),
                    subtitle: t('questionsDatabase.filter.header.subtitle'),
                    extra: (
                        <SANBox displayFlex flex='1'>
                            <SANButton
                                variant='text'
                                uppercase
                                bold
                                size='small'
                                mr='xl'
                                block
                            >
                                {t(
                                    'questionsDatabase.filter.header.actions.historic'
                                )}
                            </SANButton>
                            <SANButton
                                variant='solid'
                                color='primary'
                                uppercase
                                bold
                                size='small'
                                block
                            >
                                {t(
                                    'questionsDatabase.filter.header.actions.start'
                                )}
                            </SANButton>
                        </SANBox>
                    )
                }}
            />
            <SANBox bg='grey-solid.1' flex='1'>
                <SANLayoutContainer mt={8}>
                    <SANRow gutter={24}>
                        <SANCol sm={0} md={24}>
                            <SANSessionTitle
                                title={t('questionsDatabase.filter.subheader')}
                            />
                        </SANCol>
                        <SANCol sm={24} md={12} mb='xl'>
                            <SANCardSelectFilter
                                labelSelecteds={t(
                                    'questionsDatabase.filter.course.labelSelecteds'
                                )}
                                placeholder={t(
                                    'questionsDatabase.filter.course.placeholder'
                                )}
                                filterName={t(
                                    'questionsDatabase.filter.course.filterName'
                                )}
                                image='http://www.unirio.br/arquivocentral/imagens/localizacao.png/image_preview'
                                items={[]}
                            />
                        </SANCol>
                        <SANCol sm={24} md={12} mb='xl'>
                            <SANCardSelectFilter
                                labelSelecteds={t(
                                    'questionsDatabase.filter.theme.labelSelecteds'
                                )}
                                placeholder={t(
                                    'questionsDatabase.filter.theme.placeholder'
                                )}
                                filterName={t(
                                    'questionsDatabase.filter.theme.filterName'
                                )}
                                image='http://www.unirio.br/arquivocentral/imagens/localizacao.png/image_preview'
                                items={[]}
                            />
                        </SANCol>
                    </SANRow>
                </SANLayoutContainer>
            </SANBox>
        </>
    )
}

export default withRouter(FLXFilter)
