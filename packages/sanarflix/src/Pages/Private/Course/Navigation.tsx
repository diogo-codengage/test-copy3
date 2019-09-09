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
// import { ILastAccessed } from 'Apollo/Course/Queries/course'
import { IType } from 'Apollo/Course/Queries/course'

// Images
import document from 'Assets/images/resources/document.png'
import question from 'Assets/images/resources/question.png'
import flowchart from 'Assets/images/resources/flowchart.png'
import mentalmap from 'Assets/images/resources/mentalmap.png'
import article from 'Assets/images/resources/article.png'

type IResourceType = 'Document' | 'Video' | 'Question'

interface ICardProps {
    title?: string
    image: string
    resource_type: IResourceType
    type?: IType
    moduleName?: string
    redirectTo?: () => any
}

interface IProps {
    LastAccessedProps: ICardProps
    SuggestedItemProps: ICardProps
    isLastContent?: boolean
    hasLastAccessed?: boolean
}

const FLXCourseNavigation: React.FC<IProps> = ({
    LastAccessedProps,
    SuggestedItemProps,
    isLastContent,
    hasLastAccessed
}) => {
    const { t } = useTranslation('sanarflix')

    const configureImage = (
        image: string,
        type?: IType,
        resourceType?: IResourceType
    ): string => {
        switch (resourceType) {
            case 'Video':
                return image || ''
            case 'Document':
                switch (type) {
                    case 'flowchart':
                        return flowchart
                    case 'mentalmap':
                        return mentalmap
                    case 'article':
                        return article
                    default:
                        return document
                }
            case 'Question':
                return question
            default:
                return image
        }
    }

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
                    {hasLastAccessed && (
                        <SANCol sm={12}>
                            <SANTypography
                                mb={6}
                                color='grey.7'
                                level={5}
                                strong
                            >
                                {t('course.continue')}
                            </SANTypography>
                            <SANCardCourseModule
                                data-testid='last-accessed-content'
                                image={configureImage(
                                    LastAccessedProps.image,
                                    LastAccessedProps.type,
                                    LastAccessedProps.resource_type
                                )}
                                title={LastAccessedProps.title}
                                moduleName={t(
                                    `global.resourceTypes.${LastAccessedProps.resource_type.toLocaleLowerCase()}`
                                )}
                                onClick={LastAccessedProps.redirectTo}
                                mb={{ _: 6, sm: 0 }}
                            />
                        </SANCol>
                    )}
                    <SANCol sm={12}>
                        <SANTypography mb={6} color='grey.7' level={5} strong>
                            {t('course.itemSuggest')}
                        </SANTypography>
                        {isLastContent && SuggestedItemProps ? (
                            <SANCardCourseModule
                                data-testid='next-suggested-content'
                                image={SuggestedItemProps.image}
                                title={SuggestedItemProps.title}
                                moduleName={SuggestedItemProps.moduleName}
                                onClick={SuggestedItemProps.redirectTo}
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
                                        'data-testid':
                                            'suggested-item-question',
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
