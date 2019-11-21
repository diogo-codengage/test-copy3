import React, { useState } from 'react'

import { SANSpin, SANButton, SANBox, SANCheckbox } from '@sanar/components'
import { useTranslation } from 'react-i18next'

const FLXTermsFrame = ({ tosRequired }) => {
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
                    tosRequired
                        ? {
                              _: 'calc(100% - 230px)',
                              sm: 'calc(100% - 195px)',
                              lg: 'calc(100% - 63px)'
                          }
                        : '100%'
                }
            >
                <iframe
                    title='terms-frame'
                    onLoad={manipuleLoading}
                    src='https://docs.google.com/document/u/1/d/e/2PACX-1vQyEEuq6syrXkptAi_cle-8G9-1Encw9psjU9xaGtkxLOQgeWy2RY85ApPegn5iPrQ7AFAk5elKUvVB/pub?embedded=true'
                />
            </SANBox>
            {tosRequired && (
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
                        fontSize='md'
                        color='grey.6'
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                    >
                        {t('termsAndPrivacy.termAccept')}
                    </SANCheckbox>
                    {/* <SANTypography ml='sm' fontSize='md' color='grey.6'>                        
                    </SANTypography> */}
                    <SANBox ml={{ _: '0', sm: 'xl' }} mt={{ _: 'md', sm: '0' }}>
                        <SANButton
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

export default FLXTermsFrame
