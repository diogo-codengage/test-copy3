import React from 'react'
import PropTypes from 'prop-types'
import { space, SpaceProps } from 'styled-system'

import { SANStyled } from '../../../Theme/createTheme'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'
import { useThemeContext } from '@sanar/utils/dist/Hooks'

interface IProps
    extends PropTypes.InferProps<typeof ESCardCourseModule['propTypes']>,
        SpaceProps {
    image?: string
    resourceType: 'Document' | 'Video' | 'Question' | 'Quiz'
    type?: string
}

const SANCardCourseModuleStyled = SANStyled(ESCardCourseModule)`
    && {
        ${space}
    }
`

const SANCardCourseModule = ({
    image,
    resourceType,
    type,
    ...props
}: IProps) => {
    const {
        assets: {
            cardCourseModuleThumbs: {
                flowchart,
                mentalmap,
                article,
                document,
                question
            }
        }
    } = useThemeContext()

    const configureThumbnail = () => {
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
            case 'Quiz':
                return question
            default:
                return image
        }
    }

    return <SANCardCourseModuleStyled image={configureThumbnail()} {...props} />
}

export default SANCardCourseModule
