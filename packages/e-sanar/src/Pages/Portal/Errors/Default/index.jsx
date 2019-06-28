import React from 'react'
import image from '../../../../assets/images/error-state.svg'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'

const ESDefaultError = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='default-error'>
            <div className='default-error__container'>
                <img src={image} className='default__image' />
                <ESTypography
                    variant='body1'
                    strong
                    className='default-error__title'
                    ellipsis={{ rows: 2, expandable: false }}
                >
                    {t('errors.default.title')}
                </ESTypography>
                <ESTypography
                    variant='body2'
                    ellipsis={{ rows: 4, expandable: false }}
                    className='default-error__subtitle'
                >
                    {t('errors.default.subTitle')}
                </ESTypography>
            </div>
            <ESButton
                href='/#/aluno'
                uppercase
                color='primary'
                variant='solid'
                size='small'
                bold
                className='default-error__button'
            >
                {t('errors.tryAgain')}
            </ESButton>
        </div>
    )
}

export default ESDefaultError
