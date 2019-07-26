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
                <img src={image} alt='' className='default-error__image' />
                <ESTypography
                    level={4}
                    className='default-error__title'
                    ellipsis={{ rows: 2, expandable: false }}
                >
                    {t('errors.default.title')}
                </ESTypography>
                <ESTypography
                    variant='subtitle1'
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
                blockOnlyMobile
                className='default-error__button'
            >
                {t('errors.tryAgain')}
            </ESButton>
        </div>
    )
}

export default ESDefaultError
