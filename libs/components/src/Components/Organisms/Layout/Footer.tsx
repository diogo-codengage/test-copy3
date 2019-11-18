import React from 'react'
import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import { space, SpaceProps } from 'styled-system'
import { useTranslation } from 'react-i18next'

import { SANLayoutContainer } from '.'
import { SANFlexbox } from '../../Atoms/Flexbox'
import { SANTypography } from '../../Atoms/Typography'
import { SANSpace } from '../../Atoms/Space'

import facebook from '../../../Assets/images/social/facebook.svg'
import instagram from '../../../Assets/images/social/instagram.svg'
import youtube from '../../../Assets/images/social/youtube.svg'
import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'

const SANLayoutFooterStyled = styled.footer`
    background-color: ${ifProp(
        'darkMode',
        theme('colors.grey-solid.8'),
        theme('pureWhite')
    )};
    flex: 0 0 auto;
    ${space}
`

const Infos = styled.div`
    white-space: nowrap;
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

export interface ISANLayoutFooterProps extends SpaceProps {
    logo: string
    copyright?: React.ReactNode
    phone?: string
    whatsapp?: string
    email?: string
    facebook?: string
    instagram?: string
    youtube?: string
    darkMode?: boolean
    attendance?: string
    HelpButton?: ISANButtonProps
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
    darkMode,
    HelpButton,
    attendance,
    ...props
}) => {
    const { t } = useTranslation('components')

    return (
        <SANLayoutFooterStyled {...{ darkMode, ...props }}>
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
                                <SANBox as='img' src={logo} alt='logo-footer' />
                            </SANSpace>
                            <SANBox
                                display='flex'
                                mt={{ _: 4, lg: 0 }}
                                alignItems='center'
                                flexDirection={{
                                    _: 'column',
                                    md: 'row'
                                }}
                            >
                                {HelpButton && (
                                    <SANButton
                                        size='xsmall'
                                        uppercase
                                        bold
                                        color={darkMode ? 'white' : 'default'}
                                        variant='outlined'
                                        mb={{ md: '0', _: 'xs' }}
                                        mr={{ md: 'sm', _: '0' }}
                                        {...HelpButton}
                                    >
                                        {t('footer.helpButton')}
                                    </SANButton>
                                )}
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
                        {!!attendance && (
                            <SANTypography
                                fontSize='sm'
                                color={darkMode ? 'white.6' : 'grey.6'}
                            >
                                {attendance}
                            </SANTypography>
                        )}
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
                                    variant='text'
                                >
                                    <SANBox
                                        as='img'
                                        src={facebook}
                                        alt='facebook'
                                    />
                                </SANButton>
                            )}
                            {instagramProp && (
                                <SANButton
                                    href={instagramProp}
                                    target='_blank'
                                    size='small'
                                    variant='text'
                                >
                                    <SANBox
                                        as='img'
                                        src={instagram}
                                        alt='instagram'
                                    />
                                </SANButton>
                            )}
                            {youtubeProp && (
                                <SANButton
                                    href={youtubeProp}
                                    target='_blank'
                                    size='small'
                                    variant='text'
                                >
                                    <SANBox
                                        as='img'
                                        src={youtube}
                                        alt='youtube'
                                    />
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
