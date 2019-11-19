import React from 'react'

import { theme } from 'styled-tools'

import { useThemeContext } from '@sanar/utils/dist/Hooks'
// import { useTranslation } from 'react-i18next'
import { SANStyled } from '../../../Theme'
import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANRow, SANCol } from '../Grid'

export interface ISANCardLiveProps {
    imgUrl?: string
    type?: string
    title: string
    date: string
    description: string
    livePress: () => {}
}

const SANCardBox = SANStyled(SANBox)`
    &&& {
        box-shadow: 0px 1px 2px ${theme('colors.grey.2')};
    }
`

const SANImageBox = SANStyled(SANBox)`
    &&& {
        overflow: hidden;
        object-fit: cover;
    }
`

const SANDescriptionBox = SANStyled(SANTypography)`
    &&& {
        line-height: 1.35;
    }
`

const SANTitleBox = SANStyled(SANTypography)`
    &&& {
        line-height: 1.40;
    }
`

const SANCardLive = ({
    imgUrl,
    type,
    title,
    date,
    description,
    livePress
}: ISANCardLiveProps) => {
    const {
        assets: {
            cardLives: { default_thumbnail }
        }
    } = useThemeContext()

    const SANImageRow = SANStyled(SANRow)`
        &&& {
            max-height: ${type === 'grid' ? '100%' : 'calc(100% - 1px)'};
            margin-top: ${type === 'grid' ? '0' : '1px'};
            max-width: ${type === 'grid' ? 'calc(100% - 1px)' : '100%'};

            img {
                border-top-left-radius: ${theme('radii.base')};
                border-top-right-radius: ${
                    type === 'grid' ? theme('radii.base') : '0px'
                };
                border-bottom-left-radius: ${
                    type === 'grid' ? '0px' : theme('radii.base')
                };
                border-bottom-right-radius: 0px;
            }

            :hover {
                cursor: pointer;
                opacity: 0.5;
            }
            transition: opacity 1s;
        }
    `
    const SANDescriptionRow = SANStyled(SANRow)`
        &&& {
            border-top-left-radius: 0px;
            border-top-right-radius: ${
                type === 'grid' ? '0px' : theme('radii.base')
            };
            border-bottom-left-radius: ${
                type === 'grid' ? theme('radii.base') : '0px'
            };
            border-bottom-right-radius: ${theme('radii.base')};
        }
    `
    return (
        <SANCardBox
            width={{ _: 1, sm: `${type === 'grid' ? '232px' : 1}` }}
            height={{ _: '120px', sm: `${type === 'grid' ? 'auto' : '120px'}` }}
            display={`${type === 'grid' ? 'block' : 'inline-flex'}`}
            bg='white.10'
            borderRadius='base'
            borderWidth='0.5px'
            borderStyle='solid'
            borderColor='grey.2'
        >
            <SANImageRow
                onClick={livePress}
                width={{
                    _: '120px',
                    sm: `${type === 'grid' ? '232px' : '210px'}`
                }}
                height={{
                    _: '120px',
                    sm: `${type === 'grid' ? '131px' : '120px'}`
                }}
            >
                <SANImageBox
                    as='img'
                    src={imgUrl ? imgUrl : default_thumbnail}
                    height='100%'
                    width='100%'
                />
            </SANImageRow>
            <SANDescriptionRow
                width={{
                    _: 'calc(100% - 144px)',
                    sm: `${type === 'grid' ? 'auto' : 'calc(100% - 258px)'}`
                }}
                py='md'
                mx={{ _: 'md', sm: `${type === 'grid' ? 'md' : 'xl'}` }}
                textAlign='left'
            >
                <SANTitleBox
                    fontSize='md'
                    fontWeight='bold'
                    color='grey.6'
                    mb='xs'
                    ellipsis={{ rows: `${type === 'grid' ? 2 : 1}` }}
                >
                    {title}
                </SANTitleBox>
                <SANDescriptionBox
                    fontSize='sm'
                    color='grey.4'
                    mb={{ _: 'sm' }}
                >
                    {date}
                </SANDescriptionBox>
                <SANDescriptionBox
                    fontSize='sm'
                    color='grey.5'
                    ellipsis={{ rows: 2 }}
                >
                    {description}
                </SANDescriptionBox>
            </SANDescriptionRow>
        </SANCardBox>
    )
}

export default SANCardLive
