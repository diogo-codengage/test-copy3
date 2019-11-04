import React, { useMemo, useCallback } from 'react'

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
    SANQuery
} from '@sanar/components'
import { SANButton } from '@sanar/components/dist/Components/Atoms/Button'

import { GET_SPECIALTIES, ISpecialties } from 'Apollo/User/Queries/specialties'
import { useAuthContext } from 'Hooks/auth'

import appleSvg from 'Assets/images/app-logos/apple.svg'
import googlePlaySvg from 'Assets/images/app-logos/google-play.svg'

const RMSpecialties = withRouter<RouteComponentProps>(
    ({ history }: RouteComponentProps) => {
        const { subscription } = useAuthContext()

        const courseId = useMemo(
            () =>
                !!subscription &&
                !!subscription.activeCourse &&
                subscription.activeCourse.id,
            [subscription]
        )

        const goTo = (specialtyId: string) => {
            history.push(`/inicio/subespecialidades/${specialtyId}`)
        }

        const renderSpecialty = useCallback(
            specialty => (
                <SANCol
                    key={specialty.id}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    mb='xl'
                >
                    <SANCardSpecialty
                        image={specialty.image}
                        title={specialty.name}
                        progress={{ me: 60, others: 45 }}
                        onClick={() => goTo(specialty.id)}
                    />
                </SANCol>
            ),
            []
        )

        return (
            <SANQuery
                query={GET_SPECIALTIES}
                options={{ variables: { courseId }, skip: !courseId }}
                loaderProps={{ minHeight: '100%', flex: true }}
            >
                {({
                    data: { specialties }
                }: {
                    data: { specialties: ISpecialties[] }
                }) => (
                    <SANRow gutter={24}>
                        {specialties.map(renderSpecialty)}
                    </SANRow>
                )}
            </SANQuery>
        )
    }
)

const RMGeneral = () => {
    const { t } = useTranslation('resmed')

    return (
        <>
            <SANBox
                bg='grey-solid.1'
                pt={{ xs: '8', _: 'xl' }}
                pb={{ xs: 'xl', _: '0' }}
                minHeigth='430px'
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
                                block
                                variant='outlined'
                                color='black'
                                mr='xl'
                                href='https://apps.apple.com/br/app/sanar-residência-médica/id1375384328'
                                target='_blank'
                            >
                                <SANBox as='img' src={appleSvg} />
                            </SANButton>
                            <SANButton
                                block
                                variant='outlined'
                                color='black'
                                href='https://play.google.com/store/apps/details?id=br.com.editorasanar.residencia&hl=pt_BR'
                                target='_blank'
                            >
                                <SANBox as='img' src={googlePlaySvg} />
                            </SANButton>
                        </SANBox>
                    </SANBox>
                </SANLayoutContainer>
            </SANBox>
        </>
    )
}

export default withRouter<RouteComponentProps>(RMGeneral)
