import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANSessionTitle,
    SANRadioGroup,
    SANRadioButton,
    SANBox,
    SANSpin,
    SANCarousel,
    SANButton
} from '@sanar/components'
import {
    GET_CONTENT_TYPES,
    IContentType,
    IContentTypePayload
} from 'Apollo/Added/Queries/content-types'

import { useAddedContext } from './Context'

import { useWindowSize } from '@sanar/utils/dist/Hooks'

const responsive = [
    {
        breakpoint: 992,
        settings: {
            slidesToShow: 5,
            arrows: false,
            swipeToSlide: true
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 4,
            arrows: false,
            swipeToSlide: true
        }
    },
    {
        breakpoint: 400,
        settings: {
            slidesToShow: 3,
            arrows: false,
            swipeToSlide: true
        }
    }
]

const FLXAddedFilter = () => {
    const { t } = useTranslation('sanarflix')
    const [contentTypes, setContentTypes] = useState<IContentType[]>([])
    const { setFilter, addedCount, filter } = useAddedContext()
    const client = useApolloClient()
    const { width } = useWindowSize()

    useEffect(() => {
        const getContentTypes = async () => {
            const {
                data: { contentTypes }
            }: { data: IContentTypePayload } = await client.query({
                query: GET_CONTENT_TYPES
            })

            setContentTypes(contentTypes)
        }

        getContentTypes()
    })

    return (
        <SANBox my={{ _: 4, lg: 0 }} mx={2}>
            <SANSessionTitle
                subtitle={
                    addedCount ? (
                        t('added.totalItems.keyWithCount', {
                            count: addedCount
                        })
                    ) : addedCount === 0 ? (
                        t('added.totalItems.key_0')
                    ) : (
                        <SANSpin />
                    )
                }
                extra={
                    width >= 992 && (
                        <SANRadioGroup
                            blocks
                            defaultValue={null}
                            onChange={e => setFilter(e.target.value)}
                        >
                            <SANRadioButton value={null}>Todos</SANRadioButton>
                            {contentTypes.map((item, index) => (
                                <SANRadioButton value={item.type} key={index}>
                                    {item.description}
                                </SANRadioButton>
                            ))}
                        </SANRadioGroup>
                    )
                }
            />
            {width < 992 && (
                <SANCarousel
                    slidesToScroll={1}
                    initialSlide={0}
                    infinite={false}
                    dots={false}
                    draggable
                    swipeToSlide
                    responsive={responsive}
                >
                    <SANBox pr={3}>
                        <SANButton
                            size='small'
                            bold
                            color={!filter ? 'grey' : 'white'}
                            variant={!filter && 'solid'}
                            block
                            onClick={() => setFilter(null)}
                            value={null}
                        >
                            Todos
                        </SANButton>
                    </SANBox>

                    {contentTypes.map((item, index) => (
                        <SANBox pr={3}>
                            <SANButton
                                size='small'
                                bold
                                color={filter === item.type ? 'grey' : 'white'}
                                variant={item.type === filter && 'solid'}
                                block
                                key={index}
                                onClick={() => setFilter(item.type)}
                            >
                                {item.description}
                            </SANButton>
                        </SANBox>
                    ))}
                </SANCarousel>
            )}
        </SANBox>
    )
}

export default FLXAddedFilter
