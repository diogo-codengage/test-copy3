import React, { useCallback } from 'react'

import styled, { css } from 'styled-components'
import { theme, ifNotProp, prop } from 'styled-tools'
import Slider from 'react-slick'

import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANTypography } from '../../Atoms/Typography'

const SANCollectionStyled = styled.div``

const ImageStyled = styled(SANBox)`
    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: ${theme('colors.')};
    }
`

const SANCollectionItemStyled = styled(SANBox)<{ current: boolean }>`
    ${ifNotProp(
        'current',
        css`
            & ${SANTypography}, & ${ImageStyled} {
                opacity: 0.4;
            }
        `
    )};
`

const IconComleted = styled(SANEvaIcon)`
    position: absolute;
    top: 50%;
    left: 50%;
`

export interface ISANCollectionProps {
    items: any[]
}

const SANCollectionItem = ({ name, image, index, current, completed }) => (
    <div>
        <SANCollectionItemStyled
            bg='grey.9'
            p='md'
            {...(current && {
                borderBottom: '4px solid',
                borderColor: 'warning'
            })}
            current={current}
        >
            <SANTypography fontSize='sm' color='white.10'>
                Parte {index}
            </SANTypography>
            <SANBox position='relative'>
                <ImageStyled
                    as='img'
                    src={image}
                    my='xs'
                    borderRadius='base'
                    height='92px'
                />
                {completed && (
                    <IconComleted name='checkmark-circle-2' size='xlarge' />
                )}
            </SANBox>
            <SANTypography
                fontSize='md'
                fontWeight='bold'
                ellipsis
                color='white.10'
            >
                {name}
            </SANTypography>
        </SANCollectionItemStyled>
    </div>
)

const SANCollection: React.FC<ISANCollectionProps> = ({ items }) => {
    const renderItem = useCallback(
        (item, index) => (
            <SANCollectionItem {...item} index={index + 1} key={index} />
        ),
        []
    )

    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1
    }

    return <Slider {...settings}>{items.map(renderItem)}</Slider>
}

export default SANCollection
