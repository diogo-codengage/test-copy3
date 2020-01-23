import React, { useMemo, useCallback, memo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANLayoutContainer,
    SANBox,
    SANSessionTitle,
    SANCardSpecialty,
    SANRow,
    SANCol,
    SANTypography,
    SANQuery,
    SANGenericError
} from '@sanar/components'
import { SANButton } from '@sanar/components/dist/Components/Atoms/Button'

import {
    GET_SPECIALTIES,
    ISpecialties,
    ILastAccessed
} from 'Apollo/Home/Queries/specialties'
import { useAuthContext } from 'Hooks/auth'

import appleSvg from 'Assets/images/app-logos/apple.svg'
import googlePlaySvg from 'Assets/images/app-logos/google-play.svg'

import { useMainContext } from 'Pages/Private/Context'

const RMSpecialties = withRouter<RouteComponentProps>(
    ({ history }: RouteComponentProps) => {
        const { t } = useTranslation('resmed')
        const { activeCourse } = useAuthContext()
        const { errorLoadActiveCourse } = useMainContext()

        const courseId = useMemo(
            () => !!activeCourse && !!activeCourse.id && activeCourse.id,
            [activeCourse]
        )

        const goToSubspecialties = (specialtyId: string) => {
            history.push(`/inicio/subespecialidades/${specialtyId}`)
        }

        const goToClassroom = ({
            specialtyId,
            lesson,
            collectionId,
            resource
        }: ILastAccessed) => {
            const type = resource.type.toLocaleLowerCase()
            if (type === 'quiz') {
                history.push(
                    `/inicio/sala-aula/${specialtyId}/${lesson.id}/${collectionId}/quiz/${resource.id}/0`
                )
            } else {
                history.push(
                    `/inicio/sala-aula/${specialtyId}/${lesson.id}/${collectionId}/video/${resource.id}`
                )
            }
        }

        const renderContent = (specialty: ISpecialties) => {
            if (specialty.hasSubSpecialties) {
                goToSubspecialties(specialty.id)
            } else {
                goToClassroom(specialty.lastAccessed)
            }
        }

        const renderSpecialty = useCallback((specialty: ISpecialties) => {
            return (
                <SANCol
                    key={specialty.id}
                    mb='xl'
                    flex='1 0 25% !important'
                    minWidth='300px !important'
                >
                    <SANCardSpecialty
                        image={
                            !!specialty.images && !!specialty.images.large
                                ? specialty.images.large
                                : ''
                        }
                        title={specialty.name}
                        progress={{
                            me: specialty.progress.me,
                            others: specialty.progress.all
                        }}
                        disabled={
                            !specialty.hasSubSpecialties &&
                            !specialty.lastAccessed
                        }
                        onClick={() => renderContent(specialty)}
                    />
                </SANCol>
            )
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        if (errorLoadActiveCourse) {
            return <SANGenericError message={t('main.errorLoadActiveCourse')} />
        }

        return (
            <SANQuery
                query={GET_SPECIALTIES}
                options={{ variables: { courseId }, skip: !courseId }}
                loaderProps={{ minHeight: '250px', flex: true }}
            >
                {({
                    data: { specialties }
                }: {
                    data: { specialties: ISpecialties[] }
                }) => (
                    <SANRow gutter={24} type='flex' flexWrap='wrap'>
                        {specialties.map(renderSpecialty)}
                    </SANRow>
                )}
            </SANQuery>
        )
    }
)

const RMGeneral = memo(() => {
    const { t } = useTranslation('resmed')
    const { handleTrack } = useMainContext()

    const handleAppClicked = OS => {
        handleTrack('App Banner Clicked', {
            'OS Type': OS
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    return (
        <>
            <SANBox
                minHeight={429}
                bg='grey-solid.1'
                pt={{ xs: '8', _: 'xl' }}
                pb={{ xs: 'xl', _: '0' }}
            >
                <SANLayoutContainer>
                    <SANSessionTitle
                        title={t('home.general.subheader.title')}
                        subtitle={t('home.general.subheader.subtitle')}
                    />
                    <RMSpecialties />
                </SANLayoutContainer>
            </SANBox>
            <SANBox mt={8} mb={9}>
                <SANLayoutContainer>
                    <SANBox
                        bg='primary-2'
                        borderRadius='base'
                        py={{ xs: 'xxl', _: 'xl' }}
                        px={{ xs: 'xxl', _: 'md' }}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                    >
                        <SANBox maxWidth='488px'>
                            <SANTypography
                                fontWeight='bold'
                                fontSize='xl'
                                textAlign='center'
                            >
                                {t('home.general.card.title')}
                            </SANTypography>
                            <SANTypography
                                fontSize='md'
                                textAlign='center'
                                mt={{ xs: 'sm', _: 'xs' }}
                                mb={{ xs: 'xl', _: 'md' }}
                            >
                                {t('home.general.card.subtitle')}
                            </SANTypography>
                        </SANBox>
                        <SANBox
                            display='flex'
                            alignItems='center'
                            width={{ xs: '284px', _: '100%' }}
                        >
                            <SANButton
                                onClick={() => handleAppClicked('IOS')}
                                block
                                variant='outlined'
                                color='black'
                                mr='xl'
                                href='https://apps.apple.com/br/app/sanar-residência-médica/id1375384328'
                                target='_blank'
                                rel='noopener'
                            >
                                <SANBox as='img' src={appleSvg} />
                            </SANButton>
                            <SANButton
                                onClick={() => handleAppClicked('ANDROID')}
                                block
                                variant='outlined'
                                color='black'
                                href='https://play.google.com/store/apps/details?id=br.com.editorasanar.residencia&hl=pt_BR'
                                target='_blank'
                                rel='noopener'
                            >
                                <SANBox as='img' src={googlePlaySvg} />
                            </SANButton>
                        </SANBox>
                    </SANBox>
                </SANLayoutContainer>
            </SANBox>
        </>
    )
})

export default withRouter<RouteComponentProps>(RMGeneral)
