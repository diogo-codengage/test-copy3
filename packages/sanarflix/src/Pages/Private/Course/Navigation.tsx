import React from 'react'

import {
    SANTypography,
    SANBox,
    SANLayoutContainer,
    SANCardCourseModule,
    SANRow,
    SANCol
} from '@sanar/components'
import { useTranslation } from 'react-i18next'

import FLXBanner from 'Components/Banner'

import baseQuestions from 'Assets/images/banners/base-questions.png'

interface ICardProps {
    title?: string
    image?: string
    moduleName?: string
    redirectTo?: string
}

interface IProps {
    LastAccessedProps: ICardProps
    SuggestedItemProps?: ICardProps
    isLastContent?: boolean
}

const FLXCourseNavigation: React.FC<IProps> = ({
    LastAccessedProps,
    SuggestedItemProps,
    isLastContent
}) => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANBox
            pb={8}
            pt={8}
            borderBottom='1px solid'
            borderBottomColor='grey.0'
            backgroundColor='grey.0'
        >
            <SANLayoutContainer>
                <SANRow gutter={24}>
                    <SANCol sm={12}>
                        <SANTypography mb={6} color='grey.7' level={5} strong>
                            {t('course.continue')}
                        </SANTypography>
                        <SANCardCourseModule
                            image={LastAccessedProps.image}
                            title={LastAccessedProps.title}
                            moduleName={LastAccessedProps.moduleName}
                            // redirectTo={LastAccessedProps.redirectTo}
                            mb={{ _: 6, sm: 0 }}
                        />
                    </SANCol>
                    <SANCol sm={12}>
                        <SANTypography mb={6} color='grey.7' level={5} strong>
                            {t('course.itemSuggest')}
                        </SANTypography>
                        {!isLastContent && SuggestedItemProps ? (
                            <SANCardCourseModule
                                image={SuggestedItemProps.image}
                                title={SuggestedItemProps.title}
                                moduleName={SuggestedItemProps.moduleName}
                                // redirectTo={SuggestedItemProps.redirectTo}
                                mb={{ _: 6, sm: 0 }}
                            />
                        ) : (
                            <FLXBanner
                                BannerProps={{
                                    title: t(
                                        'course.banners.questionsBase.title'
                                    ),
                                    image: baseQuestions,
                                    ButtonProps: {
                                        children: t(
                                            'course.banners.questionsBase.action'
                                        )
                                    }
                                }}
                            />
                        )}
                    </SANCol>
                </SANRow>
            </SANLayoutContainer>
        </SANBox>
    )
}

export default FLXCourseNavigation
