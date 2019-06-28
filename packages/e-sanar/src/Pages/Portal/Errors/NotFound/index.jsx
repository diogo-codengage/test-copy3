import React from 'react'
import image from '../../../../assets/images/empty-state.svg'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { useTranslation } from 'react-i18next'

const ESNotFoundError = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='notfound'>
            <div className='notfound__container'>
                <img src={image} className='notfound__image' />
                <ESTypography
                    variant='body1'
                    strong
                    className='notfound__title'
                    ellipsis={{ rows: 2, expandable: false }}
                >
                    {t('errors.notFound.title')}
                </ESTypography>
                <ESTypography
                    variant='body2'
                    ellipsis={{ rows: 3, expandable: false }}
                    className='notfound__subtitle'
                >
                    {t('errors.notFound.subTitle')}
                </ESTypography>
            </div>
            <ESButton
                href='/#/aluno'
                uppercase
                color='primary'
                variant='solid'
                size='small'
                bold
                className='notfound__button'
            >
                {t('errors.mainPage')}
            </ESButton>
        </div>
    )
}

export default ESNotFoundError
