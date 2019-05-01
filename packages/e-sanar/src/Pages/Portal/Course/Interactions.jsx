import React from 'react'
import { useTranslation } from 'react-i18next'

import ESListView from 'sanar-ui/dist/Components/Atoms/ListView'
import ESListViewItem from 'sanar-ui/dist/Components/Molecules/ListViewItem'
import ESCard from 'sanar-ui/dist/Components/Molecules/Card'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESBadge from 'sanar-ui/dist/Components/Atoms/Badge'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANPortalPagesContainer } from '../Layout/index.js'

const SANInteractions = () => {
    const { t } = useTranslation()

    return (
        <SANPortalPagesContainer>
            <ESRow type='flex' className='interactions' gutter={24}>
                <ESCol
                    xs={24}
                    sm={24}
                    md={12}
                    alignSelf='stretch'
                    className='interactions__column'
                >
                    <ESSessionTitle
                        title={t('courseDetails.recentCommentsTitle')}
                        subtitle={t('courseDetails.recentCommentsSubtitle')}
                    />
                    <ESCard
                        actions={[
                            <ESButton clear ghost type='primary' fontSize={12}>
                                {t('courseDetails.recentCommentsButton')}
                                <ESBadge count={31} />
                            </ESButton>
                        ]}
                    >
                        <ESListView>
                            <ESListViewItem
                                avatar='https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
                                avatarSize='large'
                                title='Proin ex ipsum, facilisis id tincidunt sed, vulputate in lacus…h'
                                description='Paula Aguiar da Silva'
                                counter={0}
                            />
                            <ESListViewItem
                                avatar='https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
                                avatarSize='large'
                                title='Donec pharetra faucibus leo, vitae vestibulum leo sceleris…h'
                                description='José João Junior'
                                counter={0}
                            />
                        </ESListView>
                    </ESCard>
                </ESCol>
                <ESCol
                    xs={24}
                    sm={24}
                    md={12}
                    alignSelf='stretch'
                    className='interactions__column'
                >
                    <ESSessionTitle
                        title={t('courseDetails.recentlySavedTitle')}
                        subtitle={t('courseDetails.recentlySavedSubtitle')}
                    />
                    <ESCard
                        actions={[
                            <ESButton clear ghost type='primary' fontSize={12}>
                                {t('courseDetails.recentlySavedButton')}
                                <ESBadge count={5} />
                            </ESButton>
                        ]}
                    >
                        <ESListView>
                            <ESListViewItem
                                avatar='https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
                                avatarSize='large'
                                title='Legislação do Sistema Único de Saúde e Saúde Coletiva'
                                description='Módulo EBSERH'
                                category='AULA'
                            />
                            <ESListViewItem
                                avatar='https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
                                avatarSize='large'
                                title='Legislação do Sistema Único de Saúde e Saúde Coletiva'
                                description='Módulo EBSERH'
                                category='QUESTÃO'
                            />
                        </ESListView>
                    </ESCard>
                </ESCol>
            </ESRow>
        </SANPortalPagesContainer>
    )
}

export default SANInteractions
