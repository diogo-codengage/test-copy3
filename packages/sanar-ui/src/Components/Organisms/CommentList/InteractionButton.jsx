import React from 'react'

import ESIcon from '../../Atoms/Icon'
import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'

const InteractionButton = ({ type, count, ...props }) => (
    <div className='es-comment-list--interaction'>
        <ESButton
            {...props}
            circle
            size='xsmall'
            variant='text'
            color='white'
            bold
        >
            <ESIcon type={type} theme='filled' />
        </ESButton>
        {count ? (
            <ESTypography variant='caption' strong>
                {count}
            </ESTypography>
        ) : (
            undefined
        )}
    </div>
)

export default InteractionButton
