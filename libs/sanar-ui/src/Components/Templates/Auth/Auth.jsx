import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESBrandHeader from '../../Atoms/BrandHeader'
import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'

const ESAuthTemplate = ({
    className,
    description,
    form,
    image,
    marketing = {},
    terms,
    header
}) => {
    const classes = classNames('es-auth-template', className)
    return (
        <div className={classes}>
            <ESRow>
                <ESCol xs={24} md={12}>
                    <div className='es-auth-template__input-data'>
                        {header || (
                            <ESBrandHeader className='es-auth-template__input-data__header' />
                        )}

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
                                {terms}
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
                        <ESTypography
                            className='es-auth-template__marketing__content--title'
                            level={3}
                        >
                            {marketing.title}
                        </ESTypography>
                        <ESTypography level={6} regular>
                            {marketing.description}
                        </ESTypography>
                    </div>
                    {marketing.linkDescription && marketing.link && (
                        <ESButton
                            href={marketing.link}
                            color='white'
                            bold
                            size='small'
                            variant='outlined'
                            target='_blank'
                            uppercase
                        >
                            {marketing.linkDescription}
                        </ESButton>
                    )}
                </ESCol>
            </ESRow>
        </div>
    )
}

ESAuthTemplate.propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    form: PropTypes.node.isRequired,
    image: PropTypes.string,
    terms: PropTypes.node,
    header: PropTypes.node,
    marketing: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        linkDescription: PropTypes.string,
        link: PropTypes.string
    })
}
ESAuthTemplate.defaultProps = {}

export default ESAuthTemplate
