import React from 'react'
import image from '../../../../assets/images/unauthorized-state.svg'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'

const ESAuthorizationError = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='authorization'>
            <div className='authorization__container'>
                <img src={image} className='authorization__image' />
                <ESTypography
                    variant='body1'
                    strong
                    className='authorization__title'
                    ellipsis={{ rows: 2, expandable: false }}
                >
                    {t('errors.authorization.title')}
                </ESTypography>
                <ESTypography
                    variant='body2'
                    ellipsis={{ rows: 3, expandable: false }}
                    className='authorization__subtitle'
                >
                    {t('errors.authorization.subTitle')}
                </ESTypography>
            </div>
            <div className='authorization__button-container'>
                <ESButton
                    href='/#/aluno'
                    uppercase
                    color='primary'
                    variant='solid'
                    size='small'
                    bold
                    className='authorization__button-container--top-button'
                >
                    {t('errors.mainPage')}
                </ESButton>
                <ESButton
                    href='/#/aluno'
                    uppercase
                    color='primary'
                    variant='text'
                    size='small'
                    bold
                    className='authorization__button-container--bottom-button'
                >
                    {t('errors.navigateBack')}
                </ESButton>
            </div>
        </div>
    )
}

export default ESAuthorizationError
