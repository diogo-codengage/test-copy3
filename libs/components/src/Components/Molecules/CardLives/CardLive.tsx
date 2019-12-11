import React from 'react'

import { theme, ifProp } from 'styled-tools'
import { css } from 'styled-components'

import { useThemeContext } from '@sanar/utils/dist/Hooks'
import { SANStyled } from '../../../Theme'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'

export interface ISANCardLiveProps {
    image?: string
    hasList?: boolean
    title: string
    date: string
    description: string
    onClick: () => void
}

const SANImageBox = SANStyled(SANBox)<{ hasList: boolean }>`
    &&& {
        max-height: 100%;
        max-width: 100%;

        img {
            overflow: hidden;
            object-fit: cover;

            border-top-left-radius: ${theme('radii.base')};
            border-bottom-right-radius: 0px;            
            ${ifProp(
                'hasList',
                css`
                    border-top-right-radius: 0;
                    border-bottom-left-radius: ${theme('radii.base')};
                `,
                css`
                    border-top-right-radius: ${theme('radii.base')};
                    border-bottom-left-radius: 0;
                `
            )}
        }

        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
        transition: opacity 1s;
    }
`

const SANCardLive = ({
    image,
    hasList = true,
    title,
    date,
    description,
    onClick
}: ISANCardLiveProps) => {
    const {
        assets: {
            cardLives: { defaultThumbnail }
        }
    } = useThemeContext()

    return (
        <SANBox
            boxShadow={1}
            width={{ _: '100%', sm: hasList ? '100%' : 'auto' }}
            height={{ _: '120px', sm: hasList ? '120px' : 'auto' }}
            display={hasList ? 'inline-flex' : 'block'}
            bg='white.10'
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
        >
            <SANImageBox
                hasList={hasList}
                onClick={onClick}
                width={{ _: '120px', sm: 'auto' }}
                height={{
                    _: '120px',
                    sm: hasList ? '120px' : '131px'
                }}
            >
                <SANBox
                    as='img'
                    src={image ? image : defaultThumbnail}
                    height='100%'
                    width='100%'
                />
            </SANImageBox>
            <SANBox
                width={{
                    _: 'calc(100% - 144px)',
                    sm: hasList ? 'calc(100% - 258px)' : 'auto'
                }}
                py='md'
                mx={{ _: 'md', sm: hasList ? 'xl' : 'md' }}
                textAlign='left'
            >
                <SANTypography
                    fontSize='md'
                    fontWeight='bold'
                    color='grey.6'
                    mb='xs'
                    ellipsis={{ rows: hasList ? 1 : 2 }}
                    lineHeight='1.40'
                >
                    {title}
                </SANTypography>
                <SANTypography
                    fontSize='sm'
                    color='grey.4'
                    mb={{ _: 'sm' }}
                    lineHeight='1.35'
                >
                    {date}
                </SANTypography>
                <SANTypography
                    fontSize='sm'
                    color='grey.5'
                    ellipsis={{ rows: 2 }}
                    lineHeight='1.35'
                >
                    {description}
                </SANTypography>
            </SANBox>
        </SANBox>
    )
}

export default SANCardLive