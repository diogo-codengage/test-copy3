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
import { useAuthContext } from '../../../Hooks/auth.js'

const SANInteractions = () => {
    const { t } = useTranslation()

    const { getEnrollment } = useAuthContext()

    const {
        course: { comments: commentsMock }
    } = getEnrollment()

    const comments = commentsMock

    comments.forEach(comment => {
        comment.user.profile_picture =
            'https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
        comment.answers = comment.answers < 0 ? 0 : comment.answers
    })

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
                            <ESButton
                                variant='text'
                                color='primary'
                                size='xsmall'
                                bold
                                uppercase
                            >
                                {t('courseDetails.recentCommentsButton')}
                                <ESBadge count={31} />
                            </ESButton>
                        ]}
                    >
                        <ESListView>
                            {comments.map((comment, index) => (
                                <ESListViewItem
                                    key={index}
                                    avatar={comment.user.profile_picture}
                                    avatarSize='large'
                                    title={comment.text}
                                    description={comment.user.name}
                                    counter={comment.answers}
                                />
                            ))}
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
                            <ESButton
                                variant='text'
                                color='primary'
                                size='xsmall'
                                bold
                                uppercase
                            >
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
