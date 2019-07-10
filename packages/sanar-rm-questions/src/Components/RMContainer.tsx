import React from 'react'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

export const RMContainer = ({ children }) => {

    const { width } = useWindowSize()

    let widthContainer ='1000px';
    if(width < 1000){
        widthContainer = `${width - 20}px`
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: widthContainer }}> {children}  </div>
        </div>
    )
}
