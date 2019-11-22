import React, { useState } from 'react'

import { SANSpin, SANButton, SANBox, SANCheckbox } from '@sanar/components'
import { useTranslation } from 'react-i18next'

const RMPrivacyAndPolicyFrame = ({ onAccept }) => {
    const { t } = useTranslation('resmed')
    const [loading, setLoading] = useState(true)
    const [checked, setChecked] = useState(false)

    const manipuleLoading = () => {
        setLoading(false)
    }
    return (
        <>
            <SANSpin flex spinning={loading} minHeight='100%' />
            <SANBox
                width='100%'
                height={
                    onAccept
                        ? {
                              _: 'calc(100% - 230px)',
                              sm: 'calc(100% - 195px)',
                              lg: 'calc(100% - 63px)'
                          }
                        : '100%'
                }
            >
                <iframe
                    title='privacy-and-policy-frame'
                    onLoad={manipuleLoading}
                    src='https://docs.google.com/document/d/e/2PACX-1vTX6EgYlGttEFq459aSW6pUZBa1CSzo0zZnLKDYqexGphW76OG_jWEz4pZf6-MSu9qWBGDvBp9wGbGt/pub?embedded=true'
                />
            </SANBox>
            {onAccept && (
                <SANBox
                    flexDirection={{ _: 'column', sm: 'row' }}
                    display='inline-flex'
                    width='100%'
                    textAlign='center'
                    mt='xl'
                    alignItems='center'
                    justifyContent='center'
                >
                    <SANCheckbox
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                    >
                        <SANBox as='span' fontSize='md' color='grey.6'>
                            {t('termsAndPrivacy.privacyAccept')}
                        </SANBox>
                    </SANCheckbox>
                    <SANBox ml={{ _: '0', sm: 'xl' }} mt={{ _: 'md', sm: '0' }}>
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
                </SANBox>
            )}
        </>
    )
}

export default RMPrivacyAndPolicyFrame
