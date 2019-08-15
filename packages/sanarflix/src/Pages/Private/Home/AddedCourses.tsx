import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANSessionTitle } from '@sanar/components/dist/Components/Atoms/SessionTitle'
import { SANCarousel } from '@sanar/components/dist/Components/Molecules/Carousel'
import { SANCardCourseModule } from '@sanar/components/dist/Components/Molecules/CardCourseModule'
import { SANLayoutContainer } from '@sanar/components/dist/Components/Organisms/Layout'

import { responsive } from './ViewedCourses'

const FLXAddedCourses: React.FC = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANLayoutContainer>
            <SANSessionTitle
                title={t('home.addedCourses.title')}
                subtitle={t('home.addedCourses.subtitle')}
            />
            <SANCarousel
                className='center'
                slidesToShow={4}
                slidesToScroll={1}
                initialSlide={0}
                arrows
                infinite={false}
                dots={false}
                draggable
                lazyLoad
                responsive={responsive}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                    <div key={index}>
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
        </SANLayoutContainer>
    )
}

export default FLXAddedCourses
