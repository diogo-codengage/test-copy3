import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { theme, ifProp, prop } from 'styled-tools'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

const SANBannerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: ${theme('radii.base')};
    position: relative;
    padding: ${theme('space.8')} 0;
    ${ifProp(
        'image',
        css`
            background-image: url(${prop('image')});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        `
    )}

    ${theme('mediaQueries.down.xs')} {
        padding: ${theme('space.xxl')} 0;
    }

    &:before {
        content: '';
        border-radius: ${theme('radii.base')};
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: linear-gradient(
            0deg,
            ${theme('colors.grey.7')},
            ${theme('colors.grey.4')}
        );
    }

    & .es-typography {
        z-index: 1;
        color: ${theme('colors.grey-solid.0')};
    }

    & .es-button {
        z-index: 1;
        margin-top: ${theme('space.md')};
    }
`

type IProps = PropTypes.InferProps<typeof propTypes>

const SANBanner: React.FC<IProps> = ({ title, image, ButtonProps }) => {
    const mergeButtonProps = {
        uppercase: true,
        variant: 'outlined',
        size: 'small',
        color: 'light',
        ...ButtonProps
    }
    return (
        <SANBannerStyled {...{ image }}>
            <ESTypography level={4}>{title}</ESTypography>
            <ESButton {...mergeButtonProps} />
        </SANBannerStyled>
    )
}

const propTypes = {
    title: PropTypes.node,
    image: PropTypes.string,
    ButtonProps: PropTypes.object
}

SANBanner.propTypes = propTypes
SANBanner.defaultProps = {}

export default SANBanner
