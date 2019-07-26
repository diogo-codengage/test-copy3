import React from 'react'

import ESIcon from '../../Atoms/Icon'
import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'

const InteractionButton = ({ type, count, byUser, ...props }) => (
    <div className='es-comment-list--interaction'>
        <ESButton
            {...props}
            circle
            size='xsmall'
            variant='text'
            color='white'
            bold
            className={byUser ? 'active' : undefined}
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
