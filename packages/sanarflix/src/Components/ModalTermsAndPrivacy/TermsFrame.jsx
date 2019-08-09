import React, { useState } from 'react'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

const FLXTermsFrame = () => {
    const [loading, setLoading] = useState(true)

    const manipuleLoading = () => {
        setLoading(false)
    }
    return (
        <>
            {loading && <ESSpin flex minHeight='100%' />}
            <iframe
                title='terms-frame'
                onLoad={manipuleLoading}
                src='https://docs.google.com/document/d/e/2PACX-1vSbp1N9ok-xQ5uhQA77IZS7uWIY2FRKxtSNS_oCPbDaN5o36xeo2XAy_1mMDifSewfeYuZQoFrkzihG/pub?embedded=true'
            />
        </>
    )
}

export default FLXTermsFrame
