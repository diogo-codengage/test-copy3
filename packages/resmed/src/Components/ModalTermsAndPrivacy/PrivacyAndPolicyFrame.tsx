import React, { useState } from 'react'

import { SANSpin, SANButton, SANBox, SANCheckbox } from '@sanar/components'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

const SANIframeBox = styled(SANBox)`
    width: 100%;
    flex: 1;
    max-height: calc( 100vh - 286px );
`
const SANCheckboxContainer = styled(SANBox)`
    @media (min-width: 992px) {
        margin-bottom: 8px !important;
    }
    @media (min-width: 1024px) {
        margin-bottom: 0 !important;
    }
`

const RMPrivacyAndPolicyFrame = ({ onAccept, tosRequired }) => {
    const { t } = useTranslation('resmed')
    const [loading, setLoading] = useState(true)
    const [checked, setChecked] = useState(false)

    const manipuleLoading = () => {
        console.log('-------privacy and policy frame manipule loading-------')
        setLoading(false)
    }
    return (
        <SANBox display='flex' flexDirection='column' height='100%'>
            <SANSpin flex spinning={loading} minHeight='100%' />
            <SANIframeBox mb={{ _: 'xs', lg: '0' }}>
                <iframe
                    title='privacy-and-policy-frame'
                    onLoad={manipuleLoading}
                    src='https://docs.google.com/document/d/e/2PACX-1vTX6EgYlGttEFq459aSW6pUZBa1CSzo0zZnLKDYqexGphW76OG_jWEz4pZf6-MSu9qWBGDvBp9wGbGt/pub?embedded=true'
                />
            </SANIframeBox>
            {tosRequired && (
                <SANCheckboxContainer
                    flexDirection={{ _: 'column', sm: 'row' }}
                    display='inline-flex'
                    width='100%'
                    textAlign='center'
                    mt={{ lg: 'md' }}
                    mb={{ _: 'xs' }}
                    alignItems='center'
                    justifyContent='center'
                >
                    <SANCheckbox
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                        disabled={!onAccept}
                    >
                        <SANBox as='span' fontSize='md' color='grey.6'>
                            {t('termsAndPrivacy.privacyAccept')}
                        </SANBox>
                    </SANCheckbox>
                    {onAccept && (
                        <SANBox
                            ml={{ _: '0', sm: 'xl' }}
                            mt={{ _: 'xs', xs: 'sm', sm: '0' }}
                        >
                            <SANButton
                                onClick={onAccept}
                                disabled={!checked}
                                variant='solid'
                                size='medium'
                                uppercase
                                color='primary'
                            >
                                {t('termsAndPrivacy.button')}
                            </SANButton>
                        </SANBox>
                    )}
                </SANCheckboxContainer>
            )}
        </SANBox>
    )
}

export default RMPrivacyAndPolicyFrame
