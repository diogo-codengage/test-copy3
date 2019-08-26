import React from 'react'

import { useTranslation } from 'react-i18next'
import { theme } from 'styled-tools'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANHeader,
    SANBox,
    SANLayoutContainer,
    SANTypography,
    SANSessionTitle,
    SANCardInfo,
    SANCarousel,
    SANStyled,
    SANQuery
} from '@sanar/components'

import { GET_COURSE, ICourses } from 'Apollo/Course/Queries/course'

import Themes from './Themes'

const Extra = () => (
    <SANCarousel
        slidesToShow={4}
        slidesToScroll={1}
        initialSlide={0}
        arrows
        infinite
        dots={false}
        draggable
        lazyLoad
    >
        {[0, 1, 2, 3, 4, 5].map(() => (
            <SANCardInfo
                count={9}
                limit={100}
                suffix={'+'}
                image={
                    'http://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Play-icon.png'
                }
                text={'Vídeos'}
            />
        ))}
    </SANCarousel>
)

const SANSessionTitleStyled = SANStyled(SANSessionTitle)`
    & > div:nth-child(2) {
        display: block;
        flex: inherit;
        margin: 0;

        ${theme('mediaQueries.down.xs')} {
            margin-top: ${theme('space.md')};
        }
    }
`

const FLXCourse: React.FC<RouteComponentProps<{ id: string }>> = ({
    history,
    match: {
        params: { id }
    }
}) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANQuery query={GET_COURSE} options={{ variables: { id } }}>
            {({ data }: { data: ICourses }) => {
                const course = data.courses.data[0]
                return (
                    <SANBox displayFlex flexDirection='column' flex='1'>
                        <SANHeader
                            onBack={() => history.goBack()}
                            SessionTitleProps={{
                                title: t('courses.title'),
                                subtitle: t('courses.subtitle')
                            }}
                        />
                        <SANLayoutContainer my={8}>
                            <SANSessionTitle
                                title='O que esse curso possui'
                                subtitle={
                                    <SANTypography
                                        ellipsis={{
                                            rows: 2,
                                            showAction: true,
                                            basedOn: 'letters'
                                        }}
                                    >
                                        Mussum Ipsum, cacilds vidis litro
                                        abertis. Aenean aliquam molestie leo,
                                        vitae iaculis nisl. Interessantiss
                                        quisso pudia ce receita de bolis, mais
                                        bolis eu num gostis. Mé faiz elementum
                                        girarzis, nisi eros vermeio. Nullam
                                        volutpat risus nec leo commodo, ut
                                        interdum diam laoreet. Sed non consequat
                                        odio.
                                    </SANTypography>
                                }
                            />
                        </SANLayoutContainer>
                        <Themes courseId={course.id} />
                    </SANBox>
                )
            }}
        </SANQuery>
    )
}

export default withRouter(FLXCourse)
