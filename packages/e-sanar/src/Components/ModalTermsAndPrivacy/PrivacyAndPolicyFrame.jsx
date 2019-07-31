import React, { useState } from 'react'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

const SANPrivacyAndPolicyFrame = () => {
    const [loading, setLoading] = useState(true)

    const manipuleLoading = () => {
        setLoading(false)
    }
    return (
        <>
            {loading && <ESSpin flex minHeight='100%' />}
            <iframe
                title='privacy-and-policy-frame'
                onLoad={manipuleLoading}
                src='https://docs.google.com/document/d/e/2PACX-1vSPgofc0di2TrobxJUil1FzqBdSn9ReTHpKUfWbLFc-kAg7JvUSWdwFJ-lUErJwCGG_LhyWjHsrEZVa/pub?embedded=true'
            />
        </>
    )
}

export default SANPrivacyAndPolicyFrame
