import React from 'react'
import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import { SANLayoutContainer } from '.'
import { SANFlexbox } from '../../Atoms/Flexbox'
import { SANTypography } from '../../Atoms/Typography'
import { SANSpace } from '../../Atoms/Space'

import facebook from '../../../Assets/images/social/facebook.svg'
import instagram from '../../../Assets/images/social/instagram.svg'
import youtube from '../../../Assets/images/social/youtube.svg'
import { SANButton } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'

const SANLayoutFooterStyled = styled.footer`
    background-color: ${ifProp(
        'darkMode',
        theme('colors.grey-solid.8'),
        theme('pureWhite')
    )};
    flex: 0 0 auto;
`

const Infos = styled.div`
    padding: ${theme('space.xxl')} 0;
    border-top: 1px solid
        ${ifProp('darkMode', theme('colors.white.2'), theme('colors.grey.2'))};
    border-bottom: 1px solid
        ${ifProp('darkMode', theme('colors.white.2'), theme('colors.grey.2'))};
`

const IconAndText: React.FC<any> = styled(SANSpace)`
    color: ${ifProp(
        'darkMode',
        theme('colors.white.6'),
        theme('colors.grey.6')
    )};
    padding: ${theme('space.2')};

    & i {
        color: ${ifProp(
            'darkMode',
            theme('colors.white.6'),
            theme('colors.grey.6')
        )};
        margin-right: 4px;
    }

    @media (min-width: ${theme('breakpoints.md')}) {
        padding: 0;
        margin-right: ${theme('space.xxl')};
    }
`

const Social: React.FC<any> = styled(SANFlexbox)`
    & img {
        width: 24px;
        height: 24px;

        ${ifProp(
            'darkMode',
            css`
                filter: invert(1);
            `
        )};
    }
`

const ContactInfo: React.FC<{
    info: string
    name: string
    darkMode: boolean
}> = ({ info, name, darkMode }) => {
    return (
        <IconAndText darkMode={darkMode}>
            <SANFlexbox alignItems='center'>
                <SANEvaIcon name={name} fontSize='lg' />
                <SANTypography>{info}</SANTypography>
            </SANFlexbox>
        </IconAndText>
    )
}

export type ISANLayoutFooterProps = {
    logo: string
    copyright?: React.ReactNode
    phone?: string
    whatsapp?: string
    email?: string
    facebook?: string
    instagram?: string
    youtube?: string
    darkMode?: boolean
}

const SANLayoutFooter: React.FC<ISANLayoutFooterProps> = ({
    logo,
    phone: phoneProp,
    whatsapp: whatsappProp,
    email: emailProp,
    facebook: facebookProp,
    instagram: instagramProp,
    youtube: youtubeProp,
    copyright,
    darkMode
}) => {
    return (
        <SANLayoutFooterStyled {...{ darkMode }}>
            <Infos {...{ darkMode }}>
                <SANLayoutContainer>
                    <SANFlexbox
                        flexDirection={{ _: 'column', lg: 'row' }}
                        justifyContent={{ lg: 'space-between' }}
                        alignItems='center'
                    >
                        <SANBox
                            displayFlex
                            mb={{ _: 3, lg: 0 }}
                            flex={1}
                            alignItems={{ _: 'center' }}
                            justifyContent={{
                                xs: 'center',
                                lg: 'flex-start'
                            }}
                            flexDirection={{ _: 'column', lg: 'row' }}
                        >
                            <SANSpace mb={{ xs: 4, md: 0 }} mr={{ lg: 48 }}>
                                <img src={logo} alt='sanarflix-logo-footer' />
                            </SANSpace>
                            <SANBox
                                displayFlex
                                mt={{ _: 4, lg: 0 }}
                                alignItems='center'
                                flexDirection={{
                                    _: 'column',
                                    md: 'row'
                                }}
                            >
                                {phoneProp && (
                                    <ContactInfo
                                        info={phoneProp}
                                        name='phone-outline'
                                        darkMode={darkMode}
                                    />
                                )}
                                {whatsappProp && (
                                    <ContactInfo
                                        info={whatsappProp}
                                        name='phone-outline'
                                        darkMode={darkMode}
                                    />
                                )}
                                {emailProp && (
                                    <ContactInfo
                                        name='email-outline'
                                        info={emailProp}
                                        darkMode={darkMode}
                                    />
                                )}
                            </SANBox>
                        </SANBox>
                        <Social
                            alignItems='center'
                            justifyContent='center'
                            darkMode={darkMode}
                        >
                            {facebookProp && (
                                <SANButton
                                    href={facebookProp}
                                    target='_blank'
                                    size='small'
                                    alt='facebook'
                                    variant='text'
                                >
                                    <img src={facebook} />
                                </SANButton>
                            )}
                            {instagramProp && (
                                <SANButton
                                    href={instagramProp}
                                    target='_blank'
                                    size='small'
                                    alt='instagram'
                                    variant='text'
                                >
                                    <img src={instagram} />
                                </SANButton>
                            )}
                            {youtubeProp && (
                                <SANButton
                                    href={youtubeProp}
                                    target='_blank'
                                    size='small'
                                    alt='youtube'
                                    variant='text'
                                >
                                    <img src={youtube} />
                                </SANButton>
                            )}
                        </Social>
                    </SANFlexbox>
                </SANLayoutContainer>
            </Infos>
            {copyright}
        </SANLayoutFooterStyled>
    )
}

export default SANLayoutFooter
