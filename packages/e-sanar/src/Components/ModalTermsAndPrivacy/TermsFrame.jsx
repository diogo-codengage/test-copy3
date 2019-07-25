import React, { useState } from 'react'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

const SANTermsFrame = () => {
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
                src='https://docs.google.com/document/d/e/2PACX-1vTOeBFhUwU6odT6D3pTjFq8P7N0AADZ72KhFJZg0pH-vn_eAsprkNuxi58mjJTO_aUBMfoVmgdId_vK/pub?embedded=true'
            />
        </>
    )
}

export default SANTermsFrame
