import React from 'react'

import { SANBox, SANTypography, SANDivider, SANButton } from '@sanar/components'

const SANCardDownload = ({ title, description, ButtonProps, ...props }) => (
    <SANBox
        width='100%'
        height='60vh'
        bg='#cecece'
        alignItems='center'
        displayFlex
    >
        <SANBox
            width='250px'
            bg='#fff'
            borderRadius='4px'
            border='2px solid'
            borderColor='#D1D1D1'
            mx='auto'
            {...props}
        >
            <SANBox px='16px' py='16px'>
                <SANTypography
                    fontSize='14px'
                    fontWeight='bold'
                    color='#555659'
                    mb='12px'
                    ellipsis={{ rows: 1 }}
                >
                    {title}
                </SANTypography>
                <SANTypography fontSize='10px' color='#9A9A9A'>
                    {description}
                </SANTypography>
            </SANBox>
            <SANDivider bg='#D1D1D1' mt='16px' mb='0' width='100%' />
            <SANButton
                width='100%'
                variant='text'
                color='primary'
                size='small'
                mx='auto'
                onClick={ButtonProps.action}
                bold
                uppercase
            >
                {ButtonProps.text}
            </SANButton>
        </SANBox>
    </SANBox>
)

export default SANCardDownload
