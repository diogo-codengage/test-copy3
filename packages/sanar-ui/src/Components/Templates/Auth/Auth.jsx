import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESBrandHeader from '../../Atoms/BrandHeader'
import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'

const ESAuthTemplate = ({ className, description, form, image, marketing }) => {
    const classes = classNames('es-auth-template', className)
    return (
        <div className={classes}>
            <ESRow>
                <ESCol xs={24} md={12}>
                    <div className='es-auth-template__input-data'>
                        <ESBrandHeader className='es-auth-template__input-data__header' />

                        <div className='es-auth-template__input-data__content'>
                            {description && (
                                <ESTypography
                                    variant='subtitle1'
                                    className='es-auth-template__input-data__content--description'
                                >
                                    {description}
                                </ESTypography>
                            )}
                            {form}
                            <div className='es-auth-template__input-data__content__terms'>
                                <ESTypography>
                                    Ao entrar na plataforma, você concorda com
                                    nossos
                                </ESTypography>
                                <a href='#'> Termos de Uso </a>
                                <ESTypography>e nossa</ESTypography>
                                <a href='#'> Política de Privacidade</a>
                            </div>
                        </div>
                    </div>
                </ESCol>
                <ESCol
                    className='es-auth-template__marketing'
                    xs={0}
                    md={12}
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className='es-auth-template__marketing__content mb-xl'>
                        <ESTypography level={3}>{marketing.title}</ESTypography>
                        <ESTypography level={6} regular>
                            {marketing.description}
                        </ESTypography>
                    </div>
                    <ESButton
                        href={marketing.link}
                        color='white'
                        bold
                        variant='outlined'
                        target='_blank'
                    >
                        {marketing.linkDescription}
                    </ESButton>
                </ESCol>
            </ESRow>
        </div>
    )
}

ESAuthTemplate.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    form: PropTypes.element.isRequired,
    image: PropTypes.string,
    marketing: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        linkDescription: PropTypes.string,
        link: PropTypes.string
    })
}
ESAuthTemplate.defaultProps = {}

export default ESAuthTemplate
