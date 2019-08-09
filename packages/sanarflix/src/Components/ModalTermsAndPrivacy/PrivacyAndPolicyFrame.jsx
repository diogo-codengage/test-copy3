import React, { useState } from 'react'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

const FLXPrivacyAndPolicyFrame = () => {
    const [loading, setLoading] = useState(true)

    const manipuleLoading = () => {
        setLoading(false)
    }
    return (
        <>
            {loading && <ESSpin flex loading={loading} minHeight='100%' />}
            <iframe
                title='privacy-and-policy-frame'
                onLoad={manipuleLoading}
                src='https://docs.google.com/document/d/e/2PACX-1vS3wR_JfLC8jYEAXUXw3qVVjRzitOPasEKom4kkC3U85wncQakv3RBhzZofLnLUaAZTU-lOefgAZpb0/pub?embedded=true'
            />
        </>
    )
}

export default FLXPrivacyAndPolicyFrame
