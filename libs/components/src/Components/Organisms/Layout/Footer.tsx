import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { flexbox, grid, space } from 'styled-system'

import { SANLayoutContainer } from '.'
import { SANFlexbox } from 'Components/Atoms/Flexbox'
import { SANTypography } from 'Components/Atoms/Typography'
import { SANSpace } from 'Components/Atoms/Space'

import facebook from 'Assets/images/social/facebook.svg'
import instagram from 'Assets/images/social/instagram.svg'
import youtube from 'Assets/images/social/youtube.svg'
import phone from 'Assets/images/social/phone.svg'
import email from 'Assets/images/social/email.svg'
import { SANButton } from 'Components/Atoms/Button'
import { SANBox } from 'Components/Atoms/Box'

const SANLayoutFooterStyled = styled.footer`
    background: ${theme('pureWhite')};
    flex: 0 0 auto;
`

const Infos = styled.div`
    padding: ${theme('space.xxl')} 0;
    border-top: 1px solid ${theme('colors.grey.2')};
    border-bottom: 1px solid ${theme('colors.grey.2')};
`

const IconAndText: React.FC<any> = styled(SANSpace)`
    color: ${theme('colors.grey.6')};
    padding: ${theme('space.2')};

    & img {
        margin-right: 4px;
    }

    @media (min-width: ${theme('breakpoints.md')}) {
        padding: 0;
        margin-right: ${theme('space.xxl')};
    }
`

const Social: React.FC<any> = styled(SANFlexbox)`
    & img {
        width: 24;
        height: 24;
    }
`

const ContactInfo: React.FC<{ info: string; image: string }> = ({
    info,
    image
}) => {
    return (
        <IconAndText>
            <SANFlexbox alignItems='center'>
                <img src={image} alt='sanarflix-logo-footer' />
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
}

const SANLayoutFooter: React.FC<ISANLayoutFooterProps> = ({
    logo,
    phone: phoneProp,
    whatsapp: whatsappProp,
    email: emailProp,
    facebook: facebookProp,
    instagram: instagramProp,
    youtube: youtubeProp,
    copyright
}) => {
    return (
        <SANLayoutFooterStyled>
            <Infos>
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
                                        image={phone}
                                        info={phoneProp}
                                    />
                                )}
                                {whatsappProp && (
                                    <ContactInfo
                                        image={phone}
                                        info={whatsappProp}
                                    />
                                )}
                                {emailProp && (
                                    <ContactInfo
                                        image={email}
                                        info={emailProp}
                                    />
                                )}
                            </SANBox>
                        </SANBox>
                        <Social alignItems='center' justifyContent='center'>
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
