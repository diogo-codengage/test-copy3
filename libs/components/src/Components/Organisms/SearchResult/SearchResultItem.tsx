import React, { useMemo } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import { useThemeContext } from '@sanar/utils/dist/Hooks'
import i18n from 'sanar-ui/dist/Config/i18n'

import { SANBox, ISANBoxProps } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANDivider } from '../../Atoms/Divider'
import { SANTypography } from '../../Atoms/Typography'
import { SANRow, SANCol } from '../../Molecules/Grid'

type IResourceType =
    | 'Book'
    | 'Course'
    | 'Content'
    | 'Question'
    | 'Quiz'
    | 'Video'
    | 'Document'
    | 'Download'
type IType =
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'
    | 'resume'
    | 'video'
    | 'course'

interface IOwner {
    id: string
    name: string
}
export interface IItem {
    resourceId: string
    resourceTitle: string
    resourceType?: IResourceType
    totalPages?: number
    timeInSeconds?: number
    image?: string
    course?: IOwner
    themeId?: string
    totalThemes?: number
    type: IType
    isNew?: boolean
    isPopular?: boolean
    professorName?: string
}

export interface ISANSearchResultItemProps {
    item: IItem
    onClick?: (item: IItem) => void
}

const bordersFirst = `
    &:first-child {
        border-top-left-radius: ${theme('radii.base')};
        border-top-right-radius: ${theme('radii.base')};
    }
`

const bordersLast = `
    &:last-child {
        border-bottom-left-radius: ${theme('radii.base')};
        border-bottom-right-radius: ${theme('radii.base')};
    }
`

const WrapperStyled = styled(SANBox)`
    && {
        cursor: pointer;
        transition: background 0.3s ease-out;

        &:last-child ${SANDivider} {
            visibility: hidden;
            border-bottom-left-radius: ${theme('radii.base')};
            border-bottom-right-radius: ${theme('radii.base')};
        }
        ${bordersFirst}

        &:hover {
            background-color: ${theme('colors.grey.1')};
            ${bordersFirst}
            ${bordersLast}
        }
    }
`

const Badge: React.FC<ISANBoxProps> = ({ children, ...props }) => (
    <SANBox
        display='flex'
        alignItems='center'
        borderRadius='base'
        px='xs'
        py='xxs'
        mb='xs'
        {...props}
    >
        <SANTypography
            color='white.10'
            fontWeight='bold'
            fontSize='xs'
            lineHeight='1.2'
        >
            {children}
        </SANTypography>
    </SANBox>
)

const types = {
    resume: i18n.t('components:types.resume'),
    mentalmap: i18n.t('components:types.mentalmap'),
    flowchart: i18n.t('components:types.flowchart'),
    article: i18n.t('components:types.article'),
    lesson: i18n.t('components:types.lesson'),
    question: i18n.t('components:types.question'),
    video: i18n.t('components:types.video'),
    course: i18n.t('components:types.course')
}

const dontInfo = ['question', 'flowchart', 'mentalmap']

const formatSecondsToMin = (seconds = 0) => Math.round(seconds / 60) + 'min'

const SANSearchResultItem = (props: ISANSearchResultItemProps) => {
    const { onClick, item } = props
    const { t } = useTranslation('components')
    const {
        assets: {
            typeIcons: {
                primary: { file, flowchart, mentalmap, question, video, course }
            }
        }
    } = useThemeContext()

    const getIcon = (type: IType) => {
        switch (type) {
            case 'course':
                return course
            case 'article':
                return file
            case 'flowchart':
                return flowchart
            case 'mentalmap':
                return mentalmap
            case 'question':
                return question
            case 'video':
            case 'lesson':
                return video
            default:
                return file
        }
    }

    const getCouters = (item: IItem) => {
        switch (item.type) {
            case 'course':
                return t('searchResult.themes.keyWithCount', {
                    count: item.totalThemes
                })
            case 'lesson':
                return formatSecondsToMin(item.timeInSeconds)
            case 'resume':
            case 'article':
                return t('searchResult.pages.keyWithCount', {
                    count: item.totalPages
                })
            default:
                return ''
        }
    }

    const grid = useMemo(
        () =>
            item.image
                ? {
                      xs: 24,
                      sm: 16,
                      md: 17,
                      lg: 18,
                      xl: 19,
                      xxl: 18
                  }
                : {
                      span: 24
                  },
        [item]
    )

    return (
        <WrapperStyled
            bg='white.10'
            pt='xl'
            px={{ md: 8, _: 'md' }}
            onClick={() => onClick(item)}
        >
            <SANRow type='flex' align='center' gutter={24}>
                {item.image && item.type === 'course' && (
                    <SANCol xs={24} sm={8} md={7} lg={6} xl={5} xxl={6}>
                        <SANBox
                            as='img'
                            src={item.image}
                            height={128}
                            width='100%'
                            borderRadius='base'
                            border='1px solid'
                            borderColor='grey.2'
                            mb={{ sm: '0', _: 'md' }}
                        />
                    </SANCol>
                )}
                <SANCol {...grid}>
                    <SANBox
                        height='100%'
                        flex='1'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <SANBox flex='1' width='calc(100% - 20px)'>
                            <SANBox display='flex' alignItems='center'>
                                {item.isNew && (
                                    <Badge bg='gold.1' mr='xs'>
                                        {t('searchResult.new')}
                                    </Badge>
                                )}
                                {item.isPopular && (
                                    <Badge bg='primary'>
                                        {t('searchResult.popular')}
                                    </Badge>
                                )}
                            </SANBox>
                            <SANTypography
                                fontSize='md'
                                fontWeight='bold'
                                ellipsis
                                color='grey.7'
                                mb='xs'
                            >
                                {item.resourceTitle}
                            </SANTypography>

                            {item.course && (
                                <SANTypography
                                    ellipsis
                                    fontSize='sm'
                                    color='grey.5'
                                    mb='xs'
                                >
                                    {item.course.name}
                                </SANTypography>
                            )}
                            <SANBox display='flex' alignItems='center'>
                                <SANBox
                                    as='img'
                                    mr={2}
                                    width={20}
                                    src={getIcon(item.type)}
                                />
                                <SANTypography
                                    fontSize={{ sm: 'md', _: 'sm' }}
                                    fontWeight='bold'
                                    color='grey.6'
                                    mr='xs'
                                >
                                    {types[item.type]}
                                </SANTypography>
                                {!dontInfo.includes(item.type) && (
                                    <SANTypography
                                        fontSize={{ sm: 'md', _: 'sm' }}
                                        color='grey.6'
                                    >
                                        • {getCouters(item)}
                                    </SANTypography>
                                )}
                                {item.professorName && item.type === 'lesson' && (
                                    <SANTypography
                                        fontSize={{ sm: 'md', _: 'sm' }}
                                        color='grey.6'
                                        ml='xs'
                                    >
                                        • {item.professorName}
                                    </SANTypography>
                                )}
                            </SANBox>
                        </SANBox>
                        <SANEvaIcon name='arrow-ios-forward-outline' />
                    </SANBox>
                </SANCol>
            </SANRow>
            <SANDivider bg='grey.2' mb='0' mt='xl' />
        </WrapperStyled>
    )
}

export default SANSearchResultItem
