import React, { useMemo, memo } from 'react'

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

const SANCardLive = memo<ISANCardLiveProps>(
    ({ image, hasList = true, title, date, description, onClick }) => {
        const {
            assets: {
                cardLives: { defaultThumbnail }
            }
        } = useThemeContext()

        const props = useMemo(
            () => ({
                wrapper: {
                    height: hasList ? '120px' : 'auto',
                    display: hasList ? 'inline-flex' : 'block'
                },
                image: {
                    width: { _: '120px', sm: hasList ? '210px' : 'auto' },
                    height: {
                        _: '120px',
                        sm: hasList ? '120px' : '131px'
                    }
                },
                wrapperText: {
                    mx: { _: 'md', sm: hasList ? 'xl' : 'md' },
                    width: {
                        _: 'calc(100% - 144px)',
                        sm: hasList ? 'calc(100% - 258px)' : 'auto'
                    }
                }
            }),
            [hasList]
        )

        const imagePath = useMemo(() => (image ? image : defaultThumbnail), [
            image
        ])

        return (
            <SANBox
                boxShadow={1}
                bg='white.10'
                borderRadius='base'
                border='1px solid'
                borderColor='grey.2'
                width='100%'
                {...props.wrapper}
            >
                <SANImageBox
                    hasList={hasList}
                    onClick={onClick}
                    {...props.image}
                >
                    <SANBox
                        as='img'
                        src={imagePath}
                        height='100%'
                        width='100%'
                    />
                </SANImageBox>
                <SANBox py='md' textAlign='left' {...props.wrapperText}>
                    <SANBox height={hasList ? 'auto' : '38px'}>
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
                    </SANBox>
                    <SANTypography
                        fontSize='sm'
                        color='grey.4'
                        mb={{ _: 'sm' }}
                        lineHeight='1.35'
                    >
                        {date}
                    </SANTypography>
                    {!!description && (
                        <SANTypography
                            fontSize='sm'
                            color='grey.5'
                            ellipsis={{ rows: 2 }}
                            lineHeight='1.35'
                        >
                            {description}
                        </SANTypography>
                    )}
                </SANBox>
            </SANBox>
        )
    }
)

export default SANCardLive
