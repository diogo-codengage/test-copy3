import React from 'react'

export const RMContainer = (props) => {
    let { children } = props
    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '1000px' }}> {children}  </div>
        </div>
    )
}
