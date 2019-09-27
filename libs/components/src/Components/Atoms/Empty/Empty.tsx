import React from 'react'

import { useTranslation } from 'react-i18next'
import { theme } from 'styled-tools'
import { space, SpaceProps } from 'styled-system'

import { SANStyled } from '../../../Theme/createTheme'
import { SANTypography } from '../Typography'
import { SANBox, ISANBoxProps } from '../Box'

import emptySvg from '../../../Assets/images/empty/empty.svg'

export interface ISANEmptyProps extends SpaceProps {
    title?: React.ReactNode
    image?: React.ReactNode
    children?: React.ReactNode
    BoxProps?: ISANBoxProps
    hasTitle?: boolean
}

const ImgStyled = SANStyled.img`
    margin-bottom: ${theme('space.xl')};

    ${theme('mediaQueries.down.xs')} {
        width: 165px;
    }

    ${space}
`

const SANEmpty = ({
    title,
    image,
    hasTitle = true,
    BoxProps,
    children,
    ...props
}: ISANEmptyProps) => {
    const { t } = useTranslation('components')
    return (
        <SANBox
            displayFlex
            flexDirection='column'
            alignItems='center'
            {...props}
        >
            {image ? image : <ImgStyled src={emptySvg} alt='' />}
            {hasTitle && (
                <SANBox {...BoxProps}>
                    <SANTypography variant='subtitle2' strong>
                        {title || t('empty.title')}
                    </SANTypography>
                </SANBox>
            )}
            {children}
        </SANBox>
    )
}

export default SANEmpty
