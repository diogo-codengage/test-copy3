import React from 'react'
import i18n from 'sanar-ui/dist/Config/i18n.js'

import { SANStyled } from 'Theme'

import SANListItem, { ISANListItemProps } from './Item'
import { SANTypography } from '../Typography'
import { SANBox } from 'Components/Atoms/Box'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

const types = {
    resume: i18n.t('components:types.resume'),
    mentalmap: i18n.t('components:types.mentalmap'),
    flowchart: i18n.t('components:types.flowchart'),
    article: i18n.t('components:types.article'),
    lesson: i18n.t('components:types.lesson'),
    question: i18n.t('components:types.question'),
    video: i18n.t('components:types.video')
}

type ITypes =
    | 'mentalmap'
    | 'flowchart'
    | 'article'
    | 'lesson'
    | 'question'
    | 'resume'
    | 'video'

interface ISANDefaultListItemProps {
    title: string
    type: ITypes
    hasIcon?: boolean
}

const SANDefaultListItemStyled = SANStyled(SANListItem)`
    && {
        padding: 10px;
    }
`

const SANDefaultListItem: React.FC<ISANDefaultListItemProps> = ({
    title,
    type = 'video',
    hasIcon
}) => {
    const {
        assets: {
            typeIcons: {
                primary: { file, flowchart, mentalmap, question, video }
            }
        }
    } = useThemeContext()

    const configureIcon = (type: ITypes) => {
        switch (type) {
            case 'article':
                return file
            case 'flowchart':
                return flowchart
            case 'mentalmap':
                return mentalmap
            case 'question':
                return question
            case 'video':
                return video
            default:
                return file
        }
    }

    return (
        <SANDefaultListItemStyled>
            <SANTypography
                component='div'
                variant='subtitle2'
                strong
                ellipsis
                mb={1}
                children={title}
                color='grey.7'
            />
            <SANBox displayFlex alignItems='center'>
                {hasIcon && (
                    <SANBox
                        as='img'
                        alt='asdfs'
                        mr={2}
                        width={20}
                        src={configureIcon(type)}
                    />
                )}
                <SANTypography
                    component='span'
                    variant='subtitle'
                    color='grey.5'
                    children={types[type]}
                />
            </SANBox>
        </SANDefaultListItemStyled>
    )
}

export default SANDefaultListItem
