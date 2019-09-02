import React from 'react'
import { SANBox } from 'Components/Atoms/Box'
import { SANButton } from 'Components/Atoms/Button'
import { SANEvaIcon } from 'Components/Atoms/EvaIcon'
import { SANTypography } from 'Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'

interface IProps {
    onBack: () => void
    onClose: () => void
}

const SANClassroomMenuHeader: React.FC<IProps> = ({ onBack, onClose }) => {
    const { t } = useTranslation('components')
    return (
        <SANBox
            borderBottom='1px solid'
            borderColor='grey.4'
            displayFlex
            py={2}
            alignItems='center'
            justifyContent='space-between'
            color='white.7'
        >
            <SANButton onClick={onBack} variant='text' uppercase color='white'>
                <SANEvaIcon size='large' name='arrow-back-outline' />
                <SANTypography ml={1} variant='caption'>
                    {t('global.goToBegin')}
                </SANTypography>
            </SANButton>
            <SANButton variant='text' color='white' uppercase onClick={onClose}>
                <SANEvaIcon size='large' name='close-outline' />
            </SANButton>
        </SANBox>
    )
}

export default SANClassroomMenuHeader
