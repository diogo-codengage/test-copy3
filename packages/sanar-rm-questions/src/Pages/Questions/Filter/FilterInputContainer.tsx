import React from 'react'

interface IPros {
    label: string
}

export const FilterInputContainer:React.FC<IPros>  = (props) => {
    const { label, children } = props;
    return (
        <div style={
            {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }
        }>
            {label} {children}
        </div>
    )
}
