import React from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { SANSessionTitle } from '@sanar/components/dist/Components/Atoms/SessionTitle'
import { SANCarousel } from '@sanar/components/dist/Components/Molecules/Carousel'
import { SANCardCourseModule } from '@sanar/components/dist/Components/Molecules/CardCourseModule'

const responsive = [
    {
        breakpoint: 1560,
        settings: {
            slidesToShow: 4,
            arrows: true
        }
    },
    {
        breakpoint: 1280,
        settings: {
            slidesToShow: 3,
            arrows: false,
            variableWidth: true
        }
    }
]

const Wrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`

const FLXAddedCourses: React.FC = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <Wrapper>
            <SANSessionTitle
                title={t('home.addedCourses.title')}
                subtitle={t('home.addedCourses.subtitle')}
            />
            <SANCarousel
                slidesToScroll={1}
                infinite={false}
                dots={false}
                draggable
                lazyLoad
                responsive={responsive}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                    <div key={index} style={{ width: 232 }}>
                        <SANCardCourseModule
                            title={`Nome do item - Subtitulo do item - ${index}`}
                            actionName='Acessar'
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzM7PUwo278lb88GzaJE6KUEt4bOh01hK8NU29IqEhmq0wuUGv'
                            size='small'
                            newBadge
                        />
                    </div>
                ))}
            </SANCarousel>
        </Wrapper>
    )
}

export default FLXAddedCourses
