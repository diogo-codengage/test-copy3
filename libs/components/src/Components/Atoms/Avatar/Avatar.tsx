import React, { useMemo, ImgHTMLAttributes } from 'react'

import styled, { css } from 'styled-components'
import {
    SpaceProps,
    space,
    border,
    shadow,
    BorderProps,
    ShadowProps,
    compose
} from 'styled-system'
import { theme } from 'styled-tools'

import { SANEvaIcon } from '../EvaIcon'

export interface ISANAvatarProps
    extends ImgHTMLAttributes<any>,
        SpaceProps,
        BorderProps,
        ShadowProps {
    size?: string | number
}

export interface IIconWrapperProps
    extends SpaceProps,
        BorderProps,
        ShadowProps {
    size?: string | number
}

const isNumber = value => typeof value === 'number'

const sizes = props => {
    const size = isNumber(props.size) ? `${props.size}px` : props.size
    return css`
        width: ${size};
        height: ${size};
    `
}

const ImageStyled = styled.img<ISANAvatarProps>`
    ${compose(
        space,
        border,
        shadow
    )}
    ${sizes}
`

const Icon = styled(SANEvaIcon)``

const IconWrapper = styled.div<IIconWrapperProps>`
    ${compose(
        space,
        border,
        shadow
    )}
    ${sizes}

    align-items: center;
    display: flex;
    justify-content: center;
    background-color: ${theme('colors.grey.4')};
    color: ${theme('colors.white.10')};

    ${Icon} svg {
        font-size: ${props =>
            isNumber(props.size)
                ? `calc(${props.size}px / 2)`
                : `calc(${props.size} / 2)`};
    }
`

const SANAvatar = (props: ISANAvatarProps) => {
    const customProps = useMemo(
        () => ({
            ...props,
            ...(!props.size && { size: 40 })
        }),
        [props]
    )

    if (!!props.src || !!props.srcSet) {
        return <ImageStyled {...customProps} />
    }

    return (
        <IconWrapper {...customProps}>
            <Icon name='person-outline' />
        </IconWrapper>
    )
}

export default SANAvatar
