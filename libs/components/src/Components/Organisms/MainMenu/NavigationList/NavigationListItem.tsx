import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { ESNavigationListItem } from 'sanar-ui/dist/Components/Organisms/MainMenu'

const SANNavigationListStyled = styled.span`
    li {
        height: 48px !important;

        a,
        div {
            height: 100%;
            color: ${theme('colors.white.7')};

            &.es-navigation-list-item--active {
                color: white;

                > span {
                    > i {
                        color: white;
                    }
                }
            }
            > span {
                display: flex;
                align-items: center;

                > i {
                    margin-right: 10px;
                    color: ${theme('colors.white.5')};
                }
            }
        }
    }
`

type IProps = PropTypes.InferProps<typeof propTypes>

const SANNavigationList: React.FC<IProps> = ({ dataTestid, ...props }) => {
    return (
        <SANNavigationListStyled>
            <ESNavigationListItem data-testid={dataTestid} {...props} />
        </SANNavigationListStyled>
    )
}

const propTypes = {
    to: PropTypes.string,
    title: PropTypes.string.isRequired,
    dataTestid: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func
}

SANNavigationList.propTypes = propTypes
SANNavigationList.defaultProps = {}

export default SANNavigationList
