import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANSessionTitle } from '@sanar/components/dist/Components/Atoms/SessionTitle'
import { SANCarousel } from '@sanar/components/dist/Components/Molecules/Carousel'
import { SANCardCourseModule } from '@sanar/components/dist/Components/Molecules/CardCourseModule'
import { SANLayoutContainer } from '@sanar/components/dist/Components/Organisms/Layout'

export const responsive = [
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            arrows: false,
            centerMode: true,
            infinite: true
        }
    },
    {
        breakpoint: 576,
        settings: {
            slidesToShow: 2,
            arrows: false,
            centerMode: true,
            infinite: true
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            arrows: false,
            centerMode: true,
            infinite: true
        }
    }
]

const FLXViewedCourses: React.FC = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANLayoutContainer mb={8}>
            <SANSessionTitle
                title={t('home.viewedCourses.title')}
                subtitle={t('home.viewedCourses.subtitle')}
            />
            <SANCarousel
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
                    <div key={index} style={{ width: 232 }}>
                        <SANCardCourseModule
                            title={`Exames Laboratoriais - ${index}`}
                            badge='70%'
                            progress={70}
                            actionName='Ver curso'
                            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzM7PUwo278lb88GzaJE6KUEt4bOh01hK8NU29IqEhmq0wuUGv'
                            size='small'
                        />
                    </div>
                ))}
            </SANCarousel>
        </SANLayoutContainer>
    )
}

export default FLXViewedCourses
