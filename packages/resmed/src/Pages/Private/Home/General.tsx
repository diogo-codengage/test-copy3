import React from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANLayoutContainer,
    SANBox,
    SANSessionTitle,
    SANCardSpecialty,
    SANRow,
    SANCol,
    SANTypography
} from '@sanar/components'
import { SANButton } from '@sanar/components/dist/Components/Atoms/Button'

import appleSvg from 'Assets/images/app-logos/apple.svg'
import googlePlaySvg from 'Assets/images/app-logos/google-play.svg'

const arr = [0, 1, 2, 3, 4]

const RMGeneral = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')

    return (
        <>
            <SANBox
                bg='grey.0'
                pt={{ xs: '8', _: 'xl' }}
                pb={{ xs: 'xl', _: '0' }}
            >
                <SANLayoutContainer>
                    <SANSessionTitle
                        title={t('home.general.subheader.title')}
                        subtitle={t('home.general.subheader.subtitle')}
                    />
                    <SANRow gutter={24}>
                        {arr.map(e => (
                            <SANCol
                                key={e}
                                xs={24}
                                sm={12}
                                md={12}
                                lg={8}
                                mb='xl'
                            >
                                <SANCardSpecialty
                                    image='https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg'
                                    title='Cirurgia'
                                    progress={{ me: 60, others: 45 }}
                                    onClick={() =>
                                        history.push(
                                            '/inicio/subespecialidades'
                                        )
                                    }
                                />
                            </SANCol>
                        ))}
                    </SANRow>
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
