import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANTypography } from '../../Atoms/Typography'

const SANChatEmpty: React.FC = () => {
    const { t } = useTranslation('components')
    return (
        <SANBox
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            mt='xxl'
        >
            <SANEvaIcon name='message-square-outline' size='xlarge' />
            <SANTypography mt='sm' fontSize='md' color='grey.6'>
                {t('chat.empty')}
            </SANTypography>
        </SANBox>
    )
}

export default SANChatEmpty
