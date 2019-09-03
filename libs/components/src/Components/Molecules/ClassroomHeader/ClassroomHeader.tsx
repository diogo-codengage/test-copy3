import React from 'react'

import { theme } from 'styled-tools'

import { SANStyled } from '../../../Theme'
import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANDivider } from '../../Atoms/Divider'
import { SANRow, SANCol } from '../Grid'

export interface ISANClassroomHeaderProps {
    title: string
    subtitle: string
    actions?: boolean
    onOpenMenu?: () => {}
    ButtonPreviousProps?: ISANButtonProps
    ButtonNextProps?: ISANButtonProps
    ButtonBookmarkProps?: ISANButtonProps
}

const SANButtonMenu = SANStyled(SANButton)`
    && {
        background-color: ${theme('colors.secondary')};
        &:focus,
        &:active,
        &:hover {
            background-color: ${theme('colors.yellow.1')};
        }
        ${theme('mediaQueries.down.sm')} {
            width: 32px;
            height: 32px;
        }
    }
`

const SANClassroomHeader = ({
    title,
    subtitle,
    actions = true,
    onOpenMenu,
    ButtonPreviousProps,
    ButtonNextProps,
    ButtonBookmarkProps
}: ISANClassroomHeaderProps) => {
    const buttonDefaultProps = {
        size: 'small',
        variant: 'outlined',
        color: 'white',
        block: true
    }

    const mergeButtonPreviousProps = ButtonPreviousProps
        ? {
              ...buttonDefaultProps,
              ...ButtonPreviousProps,
              children: (
                  <>
                      <SANEvaIcon
                          name='arrow-back-outline'
                          mr='xs'
                          fontSize='lg'
                      />
                      <span>{ButtonPreviousProps.children}</span>
                  </>
              )
          }
        : {}

    const mergeButtonNextProps = ButtonNextProps
        ? {
              ...buttonDefaultProps,
              ...ButtonNextProps,
              children: (
                  <>
                      <span>{ButtonNextProps.children}</span>
                      <SANEvaIcon
                          name='arrow-forward-outline'
                          ml='xs'
                          fontSize='lg'
                      />
                  </>
              )
          }
        : {}

    const mergeButtonBookmarkProps = ButtonBookmarkProps
        ? {
              size: 'small',
              variant: 'text',
              color: 'white',
              block: true,
              ...ButtonBookmarkProps,
              children: (
                  <>
                      {ButtonBookmarkProps.bookmarked ? (
                          <SANEvaIcon
                              name='heart'
                              key='bookmarked'
                              color='secondary'
                              mr='xs'
                              fontSize='lg'
                          />
                      ) : (
                          <SANEvaIcon
                              mr='xs'
                              name='heart-outline'
                              key='not-bookmarked'
                              fontSize='lg'
                          />
                      )}
                      <span>{ButtonBookmarkProps.children}</span>
                  </>
              )
          }
        : {}

    const grid = actions
        ? {
              xs: 24,
              md: 12,
              xl: 16
          }
        : { xs: 24 }

    return (
        <SANRow
            p={{ sm: 'xl', _: 'md' }}
            type='flex'
            justify='space-between'
            align='middle'
            bg='grey-solid.7'
        >
            <SANCol {...grid}>
                <SANBox
                    displayFlex
                    justifyContent={{ sm: 'flex-start', _: 'space-between' }}
                    mb={{ md: '0', _: 'md' }}
                >
                    <SANBox order={{ sm: 1, _: 2 }}>
                        <SANButtonMenu
                            onClick={onOpenMenu}
                            circle
                            variant='text'
                            mr={{ sm: 'xl', _: '0' }}
                        >
                            <SANEvaIcon name='menu-outline' size='large' />
                        </SANButtonMenu>
                    </SANBox>
                    <SANBox order={{ sm: 2, _: 1 }}>
                        <SANTypography
                            fontSize={{ xs: 'xl', _: 'lg' }}
                            fontWeight='bold'
                            color='white.10'
                        >
                            {title}
                        </SANTypography>
                        <SANTypography fontSize='md' color='gold.0'>
                            {subtitle}
                        </SANTypography>
                    </SANBox>
                </SANBox>
            </SANCol>
            {actions && (
                <SANCol xs={24} md={12} xl={8}>
                    <SANRow
                        type='flex'
                        justifyContent={{ xs: 'flex-end', _: 'space-between' }}
                        gutter={24}
                    >
                        <SANCol
                            xs={24}
                            sm={24}
                            md={0}
                            order={3}
                            mt='md'
                            mb='xs'
                        >
                            <SANDivider />
                        </SANCol>
                        <SANCol xs={24} sm={24} md={8} order={{ _: 3, md: 1 }}>
                            <SANButton {...mergeButtonBookmarkProps} />
                        </SANCol>
                        <SANCol xs={12} sm={12} md={8} order={{ _: 1, md: 3 }}>
                            <SANButton {...mergeButtonPreviousProps} />
                        </SANCol>
                        <SANCol xs={12} sm={12} md={8} order={{ _: 1, md: 4 }}>
                            <SANButton {...mergeButtonNextProps} />
                        </SANCol>
                    </SANRow>
                </SANCol>
            )}
        </SANRow>
    )
}

export default SANClassroomHeader
