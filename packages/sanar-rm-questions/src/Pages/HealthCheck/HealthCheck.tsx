import React from 'react'

const { NODE_ENV } = process.env

export const HealthCheck: React.FC = () => {

    return (
        <>
            <pre>{JSON.stringify({ NODE_ENV }, null, 4)}</pre>
        </>
    )

}
